CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `job_post_id` mediumint(8) unsigned NOT NULL,
  `job_application_id` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_post_job_application_job_post_id_job_application_id_unique` (`job_post_id`,`job_application_id`),
  KEY `job_post_job_application_job_application_id_foreign` (`job_application_id`),
  CONSTRAINT `job_post_job_application_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_post_job_application_job_post_id_foreign` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
