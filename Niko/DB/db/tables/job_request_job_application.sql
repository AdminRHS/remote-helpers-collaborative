CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `job_request_id` mediumint(8) unsigned NOT NULL,
  `job_application_id` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_request_ja_job_request_id_js_id_unique` (`job_request_id`,`job_application_id`),
  KEY `job_request_job_application_job_application_id_foreign` (`job_application_id`),
  CONSTRAINT `job_request_job_application_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_request_job_application_job_request_id_foreign` FOREIGN KEY (`job_request_id`) REFERENCES `job_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
