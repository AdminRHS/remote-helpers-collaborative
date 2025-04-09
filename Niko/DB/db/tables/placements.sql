CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `tool_id` smallint(5) unsigned DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `placement_type_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `placements_entity_id_foreign` (`entity_id`),
  KEY `placements_tool_id_foreign` (`tool_id`),
  KEY `placements_placement_type_id_foreign` (`placement_type_id`),
  CONSTRAINT `placements_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `placements_placement_type_id_foreign` FOREIGN KEY (`placement_type_id`) REFERENCES `placement_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `placements_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
