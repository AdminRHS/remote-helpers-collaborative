CREATE TABLE $tableName (
  `task_template_id` smallint(5) unsigned NOT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  KEY `task_template_profession_task_template_id_foreign` (`task_template_id`),
  KEY `task_template_profession_profession_id_foreign` (`profession_id`),
  CONSTRAINT `task_template_profession_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_template_profession_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
