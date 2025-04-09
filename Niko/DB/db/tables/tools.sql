CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `image_icon` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tools_entity_id_foreign` (`entity_id`),
  CONSTRAINT `tools_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
