const { Octokit } = require("@octokit/rest");
const fs = require("fs-extra");
const config = require("./config");

// Get the token from environment variables (secrets are used in GitHub Actions)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error("GITHUB_TOKEN not found. Exiting.");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

/**
 * Process patch information to extract code changes.
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
    } 
    // Removed line
    else if (line.startsWith('-') && currentHunk && !line.startsWith('---')) {
      currentHunk.removedLines.push(line.substring(1));
    } 
    // Added line
    else if (line.startsWith('+') && currentHunk && !line.startsWith('+++')) {
      currentHunk.addedLines.push(line.substring(1));
    }
  }

  if (currentHunk) {
    changes.push(currentHunk);
  }

  return changes;
}

/**
 * Format commit into Markdown with detailed code changes.
 */
function formatCommitEntry(commitData) {
  const { sha, commit, html_url, files } = commitData;
  const shortSha = sha.substring(0, 7);
  const commitDate = new Date(commit.author.date).toLocaleString();

  let entry = `### [\`${shortSha}\`](${html_url}) - ${commitDate}\n\n`;
  entry += `**Author:** ${commit.author.name} (${commit.author.email})\n\n`;
  entry += `**Commit Message:** ${commit.message}\n\n`;

  if (files && files.length) {
    entry += `**Changes:**\n`;
    files.forEach(file => {
      let icon = '';
      switch (file.status) {
        case 'added':
          icon = '➕';
          break;
        case 'modified':
          icon = '✏️';
          break;
        case 'removed':
          icon = '❌';
          break;
        default:
          icon = '🔄';
      }
      
      entry += `- ${icon} **${file.status.toUpperCase()}**: \`${file.filename}\` `;
      if (file.additions !== undefined && file.deletions !== undefined) {
        entry += ` ( +${file.additions} / -${file.deletions} )\n`;
      } else {
        entry += `\n`;
      }
      
      // Add detailed code changes if we have a patch
      if (file.patch) {
        const changes = processPatch(file.patch);
        if (changes && changes.length > 0) {
          entry += `  <details>\n  <summary>View detailed changes</summary>\n\n`;
          
          // Format each hunk of changes
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
 * Retrieve the last N commits from the main branch.
 */
async function getRecentCommits() {
  const { owner, repo, commitsToProcess } = config;
  const response = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: commitsToProcess,
    sha: "main" // replace with the desired branch if necessary
  });
  return response.data;
}

/**
 * Retrieve details of the selected commit.
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
 * Generate and update CHANGELOG.md.
 */
async function generateChangelog() {
  console.log("Retrieving the latest commits...");
  const commits = await getRecentCommits();
  let changelogEntries = "# Changelog\n\n";

  for (let commit of commits) {
    // Skip commits that contain [skip changelog] in the message
    if (commit.commit.message.includes("[skip changelog]")) continue;
    
    // Skip commits that are themselves changelog updates
    if (commit.commit.message.includes("Update CHANGELOG [skip ci]")) continue;
    
    console.log(`Processing commit: ${commit.sha.substring(0, 7)}`);
    const commitDetails = await getCommitDetails(commit.sha);
    changelogEntries += formatCommitEntry(commitDetails);
  }

  let currentChangelog = "";
  try {
    currentChangelog = await fs.readFile(config.changelogPath, "utf8");
    
    // Extract existing entries (skip the title if it exists)
    const existingEntries = currentChangelog.replace(/^# Changelog\n\n/, '');
    
    // Combine new and existing entries
    changelogEntries += existingEntries;
  } catch (err) {
    console.warn("CHANGELOG.md not found, a new file will be created.");
  }
  
  await fs.writeFile(config.changelogPath, changelogEntries, "utf8");
  console.log("CHANGELOG.md file successfully updated.");
}

(async () => {
  try {
    await generateChangelog();
    process.exit(0);
  } catch (err) {
    console.error("Error generating CHANGELOG:", err);
    process.exit(1);
  }
})();