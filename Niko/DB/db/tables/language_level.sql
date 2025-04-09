CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `language_levelable_id` bigint(20) unsigned NOT NULL,
  `language_levelable_type` varchar(255) NOT NULL,
  `language_id` bigint(20) unsigned NOT NULL,
  `level_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `language_levelable_index` (`language_levelable_id`,`language_levelable_type`),
  KEY `language_level_level_id_foreign` (`level_id`),
  KEY `language_level_language_id_foreign` (`language_id`),
  CONSTRAINT `language_level_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `language_level_level_id_foreign` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
