CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `job_request_id` mediumint(8) unsigned NOT NULL,
  `job_template_id` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_request_job_template_job_request_id_job_template_id_unique` (`job_request_id`,`job_template_id`),
  KEY `job_request_job_template_job_template_id_foreign` (`job_template_id`),
  CONSTRAINT `job_request_job_template_job_request_id_foreign` FOREIGN KEY (`job_request_id`) REFERENCES `job_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_request_job_template_job_template_id_foreign` FOREIGN KEY (`job_template_id`) REFERENCES `job_templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
