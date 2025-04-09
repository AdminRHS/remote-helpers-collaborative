CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `db_name` varchar(50) DEFAULT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `front_name` varchar(100) NOT NULL,
  `translation_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fields_translation_id_foreign` (`translation_id`),
  CONSTRAINT `fields_translation_id_foreign` FOREIGN KEY (`translation_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
