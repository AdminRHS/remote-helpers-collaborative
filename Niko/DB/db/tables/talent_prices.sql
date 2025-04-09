CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `talent_id` smallint(5) unsigned DEFAULT NULL,
  `value` smallint(6) DEFAULT NULL,
  `currency_id` tinyint(3) unsigned DEFAULT NULL,
  `rate_id` tinyint(3) unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `talent_prices_talent_id_foreign` (`talent_id`),
  KEY `talent_prices_currency_id_foreign` (`currency_id`),
  KEY `talent_prices_rate_id_foreign` (`rate_id`),
  CONSTRAINT `talent_prices_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `talent_prices_rate_id_foreign` FOREIGN KEY (`rate_id`) REFERENCES `rates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `talent_prices_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
