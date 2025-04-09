CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `library_id` mediumint(8) unsigned DEFAULT NULL,
  `short_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `levels_library_id_foreign` (`library_id`),
  CONSTRAINT `levels_library_id_foreign` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
