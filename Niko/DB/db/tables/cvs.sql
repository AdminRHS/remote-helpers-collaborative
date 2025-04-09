CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `person_id` smallint(5) unsigned DEFAULT NULL,
  `country_id` bigint(20) unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `specialisation` varchar(100) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `cv_type_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cvs_person_id_foreign` (`person_id`),
  KEY `cvs_cv_type_id_foreign` (`cv_type_id`),
  KEY `cvs_country_id_foreign` (`country_id`),
  CONSTRAINT `cvs_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cvs_cv_type_id_foreign` FOREIGN KEY (`cv_type_id`) REFERENCES `cv_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cvs_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
