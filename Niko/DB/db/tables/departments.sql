CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `library_id` mediumint(8) unsigned DEFAULT NULL,
  `color` varchar(100) NOT NULL DEFAULT '#ff0000',
  PRIMARY KEY (`id`),
  KEY `departments_library_id_foreign` (`library_id`),
  CONSTRAINT `departments_library_id_foreign` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
