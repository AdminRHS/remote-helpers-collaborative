CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `library_id` mediumint(8) unsigned DEFAULT NULL,
  `iso2` varchar(2) DEFAULT NULL,
  `iso3` char(3) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `countries_library_id_foreign` (`library_id`),
  CONSTRAINT `countries_library_id_foreign` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
