CREATE TABLE $tableName (
  `task_id` mediumint(8) unsigned NOT NULL,
  `assignee_id` smallint(5) unsigned NOT NULL,
  KEY `task_assignee_task_id_foreign` (`task_id`),
  KEY `task_assignee_assignee_id_foreign` (`assignee_id`),
  CONSTRAINT `task_assignee_assignee_id_foreign` FOREIGN KEY (`assignee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_assignee_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE
)
