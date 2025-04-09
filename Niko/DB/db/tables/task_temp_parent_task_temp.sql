CREATE TABLE $tableName (
  `parent_task_template_id` smallint(5) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  KEY `task_temp_parent_task_temp_parent_task_template_id_foreign` (`parent_task_template_id`),
  KEY `task_temp_parent_task_temp_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `task_temp_parent_task_temp_parent_task_template_id_foreign` FOREIGN KEY (`parent_task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_temp_parent_task_temp_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
