CREATE TABLE $tableName (
  `task_template_id` smallint(5) unsigned NOT NULL,
  `step_template_id` smallint(5) unsigned NOT NULL,
  `order` mediumint(8) unsigned DEFAULT NULL,
  PRIMARY KEY (`task_template_id`,`step_template_id`),
  KEY `task_template_step_template_step_template_id_foreign` (`step_template_id`),
  CONSTRAINT `task_template_step_template_step_template_id_foreign` FOREIGN KEY (`step_template_id`) REFERENCES `step_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_template_step_template_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
