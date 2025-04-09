CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `job_template_id` smallint(5) unsigned NOT NULL,
  `language_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_templates_languages_job_template_id_language_id_unique` (`job_template_id`,`language_id`),
  KEY `job_templates_languages_language_id_foreign` (`language_id`),
  CONSTRAINT `job_templates_languages_job_template_id_foreign` FOREIGN KEY (`job_template_id`) REFERENCES `job_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_templates_languages_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE
)
