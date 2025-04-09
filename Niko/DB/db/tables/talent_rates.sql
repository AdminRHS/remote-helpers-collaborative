CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `talent_id` smallint(5) unsigned NOT NULL,
  `rate_id` tinyint(3) unsigned DEFAULT NULL,
  `inner_client_id` tinyint(3) unsigned DEFAULT NULL,
  `shift_id` tinyint(3) unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `talent_rates_talent_id_foreign` (`talent_id`),
  KEY `talent_rates_rate_id_foreign` (`rate_id`),
  KEY `talent_rates_inner_client_id_foreign` (`inner_client_id`),
  KEY `talent_rates_shift_id_foreign` (`shift_id`),
  CONSTRAINT `talent_rates_inner_client_id_foreign` FOREIGN KEY (`inner_client_id`) REFERENCES `inner_clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `talent_rates_rate_id_foreign` FOREIGN KEY (`rate_id`) REFERENCES `rates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `talent_rates_shift_id_foreign` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `talent_rates_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
