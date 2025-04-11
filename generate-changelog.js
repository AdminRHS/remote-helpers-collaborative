const { Octokit } = require("@octokit/rest");
const fs = require("fs-extra");
const config = require("./config");

// Get the token from environment variables (secrets are used in GitHub Actions)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error("❌ GITHUB_TOKEN not found. Exiting.");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Patterns to skip commits
const skipPatterns = [
  /\[skip changelog\]/i,
  /Update CHANGELOG \[skip ci\]/i,
];

const shouldSkipCommit = (message) => skipPatterns.some(pattern => pattern.test(message));

/**
 * Process patch information to extract code changes.
 *
 * @param {string} patch - The patch string from the commit file.
 * @returns {Array|null} Array of hunks with removed and added lines, or null if no patch is provided.
 */
function processPatch(patch) {
  if (!patch) return null;

  const changes = [];
  const lines = patch.split('\n');
  let currentHunk = null;

  for (const line of lines) {
    // New hunk header
    if (line.startsWith('@@')) {
      if (currentHunk) {
        changes.push(currentHunk);
      }
      currentHunk = {
        header: line,
        removedLines: [],
        addedLines: [],
      };
      continue;
    }
    if (!currentHunk) continue; // Safety check

    // Removed line (ignore hunk separator lines)
    if (line.startsWith('-') && !line.startsWith('---')) {
      currentHunk.removedLines.push(line.substring(1));
      continue;
    }
    // Added line (ignore hunk separator lines)
    if (line.startsWith('+') && !line.startsWith('+++')) {
      currentHunk.addedLines.push(line.substring(1));
    }
  }
  if (currentHunk) {
    changes.push(currentHunk);
  }
  return changes;
}

/**
 * Format commit data into Markdown with detailed code changes.
 *
 * @param {object} commitData - The detailed commit data.
 * @returns {string} Formatted Markdown entry.
 */
function formatCommitEntry(commitData) {
  const { sha, commit, html_url, files } = commitData;
  const shortSha = sha.substring(0, 7);
  const commitDate = new Date(commit.author.date).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  let entry = `### [\`${shortSha}\`](${html_url}) – ${commitDate}\n\n` +
              `**Author:** ${commit.author.name} (${commit.author.email})\n\n` +
              `**Commit Message:** ${commit.message}\n\n`;

  if (files && files.length) {
    entry += `**Changes:**\n`;
    files.forEach(file => {
      const statusIcons = { added: '➕', modified: '✏️', removed: '❌' };
      const icon = statusIcons[file.status] || '🔄';

      entry += `- ${icon} **${file.status.toUpperCase()}**: \`${file.filename}\``;
      if (file.additions !== undefined && file.deletions !== undefined) {
        entry += ` ( +${file.additions} / -${file.deletions} )\n`;
      } else {
        entry += `\n`;
      }

      // Include detailed code changes if a patch is available
      if (file.patch) {
        const changes = processPatch(file.patch);
        if (changes && changes.length > 0) {
          entry += `  <details>\n  <summary>View detailed changes</summary>\n\n`;
          changes.forEach((hunk, index) => {
            entry += `  **Hunk ${index + 1}:** ${hunk.header}\n\n`;
            if (hunk.removedLines.length > 0) {
              entry += "  ```diff\n";
              entry += "  # Removed lines:\n";
              hunk.removedLines.forEach(line => {
                entry += `  - ${line}\n`;
              });
              entry += "  ```\n\n";
            }
            if (hunk.addedLines.length > 0) {
              entry += "  ```diff\n";
              entry += "  # Added lines:\n";
              hunk.addedLines.forEach(line => {
                entry += `  + ${line}\n`;
              });
              entry += "  ```\n\n";
            }
            // Side-by-side comparison for modified hunks
            if (hunk.removedLines.length > 0 && hunk.addedLines.length > 0) {
              entry += "  **Before → After:**\n\n";
              entry += "  | Before | After |\n";
              entry += "  |--------|-------|\n";
              const maxLines = Math.max(hunk.removedLines.length, hunk.addedLines.length);
              for (let i = 0; i < maxLines; i++) {
                const beforeLine = i < hunk.removedLines.length ? hunk.removedLines[i] : "";
                const afterLine = i < hunk.addedLines.length ? hunk.addedLines[i] : "";
                entry += `  | \`${beforeLine}\` | \`${afterLine}\` |\n`;
              }
              entry += "\n";
            }
          });
          entry += "  </details>\n\n";
        }
      }
    });
  }
  entry += `---\n\n`;
  return entry;
}

/**
 * Retrieve the latest N commits from the main branch.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of commit objects.
 */
async function getRecentCommits() {
  const { owner, repo, commitsToProcess } = config;
  const response = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: commitsToProcess,
    sha: "main" // Replace with the desired branch if necessary
  });
  return response.data;
}

/**
 * Retrieve detailed information about a commit using its SHA.
 *
 * @param {string} sha - The commit SHA.
 * @returns {Promise<object>} A promise that resolves to the commit details.
 */
async function getCommitDetails(sha) {
  const { owner, repo } = config;
  const response = await octokit.rest.repos.getCommit({
    owner,
    repo,
    ref: sha,
  });
  return response.data;
}

/**
 * Generate and update the CHANGELOG.md file.
 */
async function generateChangelog() {
  console.log("🚀 Retrieving the latest commits...");
  const commits = await getRecentCommits();
  let changelogEntries = "# Changelog\n\n";

  for (const commit of commits) {
    if (shouldSkipCommit(commit.commit.message)) continue;

    console.log(`🚀 Processing commit: ${commit.sha.substring(0, 7)}`);
    const commitDetails = await getCommitDetails(commit.sha);
    changelogEntries += formatCommitEntry(commitDetails);
  }

  let currentChangelog = "";
  try {
    currentChangelog = await fs.readFile(config.changelogPath, { encoding: "utf8" });
    // Remove the header if it exists and append new entries before the existing content
    const existingEntries = currentChangelog.replace(/^# Changelog\n\n/, '');
    changelogEntries += existingEntries;
  } catch (err) {
    console.warn("⚠️ CHANGELOG.md not found, a new file will be created.");
  }

  await fs.writeFile(config.changelogPath, changelogEntries, { encoding: "utf8" });
  console.log("✅ CHANGELOG.md file successfully updated.");
}

(async () => {
  try {
    await generateChangelog();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error generating CHANGELOG:", err);
    process.exit(1);
  }
})();