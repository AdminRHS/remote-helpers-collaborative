CREATE TABLE $tableName (
  `task_id` mediumint(8) unsigned NOT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `tasks_professions_task_id_profession_id_unique` (`task_id`,`profession_id`),
  KEY `tasks_professions_profession_id_foreign` (`profession_id`),
  CONSTRAINT `tasks_professions_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tasks_professions_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
