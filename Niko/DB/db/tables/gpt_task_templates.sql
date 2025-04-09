CREATE TABLE $tableName (
  `gpt_id` smallint(5) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `gpt_task_templates_gpt_id_task_template_id_unique` (`gpt_id`,`task_template_id`),
  KEY `gpt_task_templates_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `gpt_task_templates_gpt_id_foreign` FOREIGN KEY (`gpt_id`) REFERENCES `gpts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `gpt_task_templates_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
