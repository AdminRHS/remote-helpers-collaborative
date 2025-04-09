CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `task_id` mediumint(8) unsigned DEFAULT NULL,
  `task_resultable_type` varchar(255) NOT NULL,
  `task_resultable_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `task_results_task_id_foreign` (`task_id`),
  KEY `task_results_task_resultable_type_task_resultable_id_index` (`task_resultable_type`,`task_resultable_id`),
  CONSTRAINT `task_results_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
