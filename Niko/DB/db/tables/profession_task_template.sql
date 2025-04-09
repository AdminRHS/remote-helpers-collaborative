CREATE TABLE $tableName (
  `profession_id` bigint(20) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `profession_task_tpl_unique` (`profession_id`,`task_template_id`),
  KEY `profession_task_template_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `profession_task_template_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profession_task_template_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
