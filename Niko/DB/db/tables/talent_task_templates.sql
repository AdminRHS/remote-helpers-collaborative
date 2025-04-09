CREATE TABLE $tableName (
  `talent_id` smallint(5) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `talent_task_templates_unique` (`talent_id`,`task_template_id`),
  KEY `talent_task_templates_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `talent_task_templates_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `talent_task_templates_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
