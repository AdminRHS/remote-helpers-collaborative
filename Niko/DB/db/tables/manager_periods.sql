CREATE TABLE $tableName (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `talent_id` smallint(5) unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `manager_id` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manager_periods_talent_id_foreign` (`talent_id`),
  KEY `manager_periods_manager_id_foreign` (`manager_id`),
  CONSTRAINT `manager_periods_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `manager_periods_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
