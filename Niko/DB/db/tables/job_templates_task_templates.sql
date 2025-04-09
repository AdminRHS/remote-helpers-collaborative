CREATE TABLE $tableName (
  `job_template_id` smallint(5) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `job_temp_task_tpl_unique` (`job_template_id`,`task_template_id`),
  KEY `job_templates_task_templates_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `job_templates_task_templates_job_template_id_foreign` FOREIGN KEY (`job_template_id`) REFERENCES `job_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_templates_task_templates_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
