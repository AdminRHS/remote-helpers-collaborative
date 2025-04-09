CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `block_id` tinyint(3) unsigned DEFAULT NULL,
  `front_name` varchar(100) DEFAULT NULL,
  `tooltip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entity_block_entity_id_block_id_unique` (`entity_id`,`block_id`),
  KEY `entity_block_block_id_foreign` (`block_id`),
  CONSTRAINT `entity_block_block_id_foreign` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `entity_block_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
