CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `job_template_id` smallint(5) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_templates_tools_job_template_id_tool_id_unique` (`job_template_id`,`tool_id`),
  KEY `job_templates_tools_tool_id_foreign` (`tool_id`),
  CONSTRAINT `job_templates_tools_job_template_id_foreign` FOREIGN KEY (`job_template_id`) REFERENCES `job_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_templates_tools_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE
)
