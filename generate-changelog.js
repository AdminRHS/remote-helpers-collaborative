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
 * Format commit into Markdown.
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
          icon = '';
      }
      entry += `- ${icon} **${file.status.toUpperCase()}**: \`${file.filename}\` `;
      if (file.additions !== undefined && file.deletions !== undefined) {
        entry += ` ( +${file.additions} / -${file.deletions} )\n`;
      } else {
        entry += `\n`;
      }
    });
  }
  entry += `\n---\n\n`;
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
  let changelogEntries = "";

  for (let commit of commits) {
    // If necessary, filter commits, for example, skip those that contain [skip changelog]
    if (commit.commit.message.includes("[skip changelog]")) continue;
    
    const commitDetails = await getCommitDetails(commit.sha);
    changelogEntries += formatCommitEntry(commitDetails);
  }

  let currentChangelog = "";
  try {
    currentChangelog = await fs.readFile(config.changelogPath, "utf8");
  } catch (err) {
    console.warn("CHANGELOG.md not found, a new file will be created.");
  }
  
  const newChangelog = changelogEntries + currentChangelog;
  await fs.writeFile(config.changelogPath, newChangelog, "utf8");
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
