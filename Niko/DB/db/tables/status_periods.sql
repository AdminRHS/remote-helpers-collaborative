CREATE TABLE $tableName (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `talent_id` smallint(5) unsigned NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_periods_talent_id_foreign` (`talent_id`),
  KEY `status_periods_status_id_foreign` (`status_id`),
  CONSTRAINT `status_periods_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `status_periods_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
