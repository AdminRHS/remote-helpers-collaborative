CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `job_site_id` smallint(5) unsigned NOT NULL,
  `country_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_site_country_job_site_id_country_id_unique` (`job_site_id`,`country_id`),
  KEY `job_site_country_country_id_foreign` (`country_id`),
  CONSTRAINT `job_site_country_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_site_country_job_site_id_foreign` FOREIGN KEY (`job_site_id`) REFERENCES `job_sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
