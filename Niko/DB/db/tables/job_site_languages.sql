CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `job_site_id` smallint(5) unsigned NOT NULL,
  `language_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_site_languages_job_site_id_language_id_unique` (`job_site_id`,`language_id`),
  KEY `job_site_languages_language_id_foreign` (`language_id`),
  CONSTRAINT `job_site_languages_job_site_id_foreign` FOREIGN KEY (`job_site_id`) REFERENCES `job_sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_site_languages_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE
)
