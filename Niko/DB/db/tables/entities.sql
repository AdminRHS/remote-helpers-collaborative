CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `entity_type_id` tinyint(3) unsigned DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entities_entity_type_id_foreign` (`entity_type_id`),
  CONSTRAINT `entities_entity_type_id_foreign` FOREIGN KEY (`entity_type_id`) REFERENCES `entity_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
