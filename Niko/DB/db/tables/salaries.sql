﻿CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `talent_id` smallint(5) unsigned NOT NULL,
  `value` smallint(6) DEFAULT NULL,
  `currency_id` tinyint(3) unsigned DEFAULT NULL,
  `salary_type_id` tinyint(3) unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `hourly_cost` tinyint(3) unsigned DEFAULT NULL,
  `hourly_currency_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `salaries_talent_id_foreign` (`talent_id`),
  KEY `salaries_currency_id_foreign` (`currency_id`),
  KEY `salaries_salary_type_id_foreign` (`salary_type_id`),
  KEY `salaries_hourly_currency_id_foreign` (`hourly_currency_id`),
  CONSTRAINT `salaries_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `salaries_hourly_currency_id_foreign` FOREIGN KEY (`hourly_currency_id`) REFERENCES `currencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `salaries_salary_type_id_foreign` FOREIGN KEY (`salary_type_id`) REFERENCES `salary_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `salaries_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
