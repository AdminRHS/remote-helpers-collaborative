CREATE TABLE $tableName (
  `task_id` mediumint(8) unsigned NOT NULL,
  `controller_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`task_id`,`controller_id`),
  KEY `task_controller_controller_id_foreign` (`controller_id`),
  CONSTRAINT `task_controller_controller_id_foreign` FOREIGN KEY (`controller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_controller_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE
)
