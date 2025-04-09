CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `talent_id` smallint(5) unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `profession_periods_talent_id_foreign` (`talent_id`),
  KEY `profession_periods_profession_id_foreign` (`profession_id`),
  CONSTRAINT `profession_periods_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profession_periods_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
