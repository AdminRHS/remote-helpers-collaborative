CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `job_request_id` mediumint(8) unsigned NOT NULL,
  `sub_industry_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_request_sub_industry_job_request_id_sub_industry_id_unique` (`job_request_id`,`sub_industry_id`),
  KEY `job_request_sub_industry_sub_industry_id_foreign` (`sub_industry_id`),
  CONSTRAINT `job_request_sub_industry_job_request_id_foreign` FOREIGN KEY (`job_request_id`) REFERENCES `job_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_request_sub_industry_sub_industry_id_foreign` FOREIGN KEY (`sub_industry_id`) REFERENCES `sub_industries` (`id`) ON DELETE CASCADE
)
