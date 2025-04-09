CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `milestone_template_id` bigint(20) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  `task_template_queue` mediumint(8) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `milestone_task_unique` (`milestone_template_id`,`task_template_id`),
  KEY `milestone_template_task_template_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `milestone_template_task_template_milestone_template_id_foreign` FOREIGN KEY (`milestone_template_id`) REFERENCES `milestone_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `milestone_template_task_template_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
