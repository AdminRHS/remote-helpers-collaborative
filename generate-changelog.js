const { Octokit } = require("@octokit/rest");
const fs = require("fs-extra");
const config = require("./config");

// Получаем токен из переменных окружения (в GitHub Actions используется secrets)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error("GITHUB_TOKEN не найден. Завершаем выполнение.");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

/**
 * Форматирование коммита в Markdown.
 */
function formatCommitEntry(commitData) {
  const { sha, commit, html_url, files } = commitData;
  const shortSha = sha.substring(0, 7);
  const commitDate = new Date(commit.author.date).toLocaleString();

  let entry = `### [\`${shortSha}\`](${html_url}) - ${commitDate}\n\n`;
  entry += `**Автор:** ${commit.author.name} (${commit.author.email})\n\n`;
  entry += `**Сообщение:** ${commit.message}\n\n`;

  if (files && files.length) {
    entry += `**Изменения:**\n`;
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
 * Получение последних N коммитов из основной ветки.
 */
async function getRecentCommits() {
  const { owner, repo, commitsToProcess } = config;
  const response = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: commitsToProcess,
    sha: "main" // замените на нужную ветку, если требуется
  });
  return response.data;
}

/**
 * Получаем подробности выбранного коммита.
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
 * Генерация и обновление CHANGELOG.md.
 */
async function generateChangelog() {
  console.log("Получаем последние коммиты...");
  const commits = await getRecentCommits();
  let changelogEntries = "";

  for (let commit of commits) {
    // При необходимости фильтровать коммиты, например, пропускать те, что содержат [skip changelog]
    if (commit.commit.message.includes("[skip changelog]")) continue;
    
    const commitDetails = await getCommitDetails(commit.sha);
    changelogEntries += formatCommitEntry(commitDetails);
  }

  let currentChangelog = "";
  try {
    currentChangelog = await fs.readFile(config.changelogPath, "utf8");
  } catch (err) {
    console.warn("CHANGELOG.md не найден, будет создан новый файл.");
  }
  
  const newChangelog = changelogEntries + currentChangelog;
  await fs.writeFile(config.changelogPath, newChangelog, "utf8");
  console.log("Файл CHANGELOG.md успешно обновлён.");
}

(async () => {
  try {
    await generateChangelog();
    process.exit(0);
  } catch (err) {
    console.error("Ошибка генерации CHANGELOG:", err);
    process.exit(1);
  }
})();
