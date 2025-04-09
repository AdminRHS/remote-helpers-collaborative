CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `short_name` varchar(50) DEFAULT NULL,
  `slug` varchar(50) DEFAULT NULL,
  `is_student` tinyint(1) NOT NULL DEFAULT 0,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `city_id` bigint(20) unsigned DEFAULT NULL,
  `user_id` smallint(5) unsigned DEFAULT NULL,
  `job_application_id` mediumint(8) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `persons_entity_id_foreign` (`entity_id`),
  KEY `persons_user_id_foreign` (`user_id`),
  KEY `persons_job_application_id_foreign` (`job_application_id`),
  KEY `persons_city_id_foreign` (`city_id`),
  CONSTRAINT `persons_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `persons_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `persons_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `persons_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
