CREATE TABLE $tableName (
  `task_request_id` mediumint(8) unsigned NOT NULL,
  `assignee_id` smallint(5) unsigned NOT NULL,
  KEY `task_request_assignee_task_request_id_foreign` (`task_request_id`),
  KEY `task_request_assignee_assignee_id_foreign` (`assignee_id`),
  CONSTRAINT `task_request_assignee_assignee_id_foreign` FOREIGN KEY (`assignee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_request_assignee_task_request_id_foreign` FOREIGN KEY (`task_request_id`) REFERENCES `task_request` (`id`) ON DELETE CASCADE
)
