CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reports_entity_id_foreign` (`entity_id`),
  CONSTRAINT `reports_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
