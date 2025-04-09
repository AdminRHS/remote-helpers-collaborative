CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tool_types_entity_id_foreign` (`entity_id`),
  CONSTRAINT `tool_types_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
