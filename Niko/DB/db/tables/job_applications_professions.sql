CREATE TABLE $tableName (
  `job_application_id` mediumint(8) unsigned NOT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  KEY `job_applications_professions_job_application_id_foreign` (`job_application_id`),
  KEY `job_applications_professions_profession_id_foreign` (`profession_id`),
  CONSTRAINT `job_applications_professions_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_applications_professions_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE
)
