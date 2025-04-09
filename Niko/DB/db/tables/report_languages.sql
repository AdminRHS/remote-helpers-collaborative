CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `language_id` bigint(20) unsigned NOT NULL,
  `job_sites` smallint(5) unsigned DEFAULT NULL,
  `job_posts` smallint(5) unsigned DEFAULT NULL,
  `job_templates` smallint(5) unsigned DEFAULT NULL,
  `month` date NOT NULL,
  `action` enum('CREATE','READ','UPDATE','DELETE') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `report_languages_entity_id_foreign` (`entity_id`),
  KEY `report_languages_language_id_foreign` (`language_id`),
  CONSTRAINT `report_languages_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `report_languages_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE
)
