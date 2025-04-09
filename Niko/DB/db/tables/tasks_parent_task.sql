CREATE TABLE $tableName (
  `task_id` mediumint(8) unsigned NOT NULL,
  `parent_task_id` mediumint(8) unsigned NOT NULL,
  KEY `tasks_parent_task_task_id_foreign` (`task_id`),
  KEY `tasks_parent_task_parent_task_id_foreign` (`parent_task_id`),
  CONSTRAINT `tasks_parent_task_parent_task_id_foreign` FOREIGN KEY (`parent_task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tasks_parent_task_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
