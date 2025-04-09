CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `profession_id` bigint(20) unsigned NOT NULL,
  `value` smallint(5) unsigned NOT NULL,
  `currency_id` tinyint(3) unsigned DEFAULT NULL,
  `rate_id` tinyint(3) unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profession_prices_currency_id_foreign` (`currency_id`),
  KEY `profession_prices_rate_id_foreign` (`rate_id`),
  KEY `profession_prices_profession_id_foreign` (`profession_id`),
  CONSTRAINT `profession_prices_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `profession_prices_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profession_prices_rate_id_foreign` FOREIGN KEY (`rate_id`) REFERENCES `rates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
