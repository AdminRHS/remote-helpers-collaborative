CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `user_id` smallint(5) unsigned NOT NULL,
  `job_sites` smallint(5) unsigned DEFAULT NULL,
  `job_accounts` smallint(5) unsigned DEFAULT NULL,
  `job_templates` smallint(5) unsigned DEFAULT NULL,
  `job_posts` smallint(5) unsigned DEFAULT NULL,
  `job_applications` smallint(5) unsigned DEFAULT NULL,
  `job_requests` smallint(5) unsigned DEFAULT NULL,
  `date` date NOT NULL,
  `action` enum('CREATE','READ','UPDATE','DELETE') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `report_dailies_entity_id_foreign` (`entity_id`),
  KEY `report_dailies_user_id_foreign` (`user_id`),
  CONSTRAINT `report_dailies_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `report_dailies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
