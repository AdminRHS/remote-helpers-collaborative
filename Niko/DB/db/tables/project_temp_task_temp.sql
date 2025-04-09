CREATE TABLE $tableName (
  `project_template_id` smallint(5) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `proj_temp_task_temp_unique` (`project_template_id`,`task_template_id`),
  KEY `project_temp_task_temp_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `project_temp_task_temp_project_template_id_foreign` FOREIGN KEY (`project_template_id`) REFERENCES `project_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_temp_task_temp_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
