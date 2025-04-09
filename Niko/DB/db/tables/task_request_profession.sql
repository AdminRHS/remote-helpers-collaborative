CREATE TABLE $tableName (
  `task_request_id` mediumint(8) unsigned NOT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  KEY `task_request_profession_task_request_id_foreign` (`task_request_id`),
  KEY `task_request_profession_profession_id_foreign` (`profession_id`),
  CONSTRAINT `task_request_profession_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_request_profession_task_request_id_foreign` FOREIGN KEY (`task_request_id`) REFERENCES `task_request` (`id`) ON DELETE CASCADE
)
