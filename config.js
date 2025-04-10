// config.js — конфигурация генератора CHANGELOG
module.exports = {
  // Если запущено в GitHub Actions, GITHUB_REPOSITORY содержит "owner/repo"
  owner: process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[0] : 'owner',
  repo: process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'repo',
  changelogPath: './CHANGELOG.md',
  // Количество последних коммитов для обработки (при необходимости можно увеличить)
  commitsToProcess: 10
};
