CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `library_id` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `objects_library_id_foreign` (`library_id`),
  CONSTRAINT `objects_library_id_foreign` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
