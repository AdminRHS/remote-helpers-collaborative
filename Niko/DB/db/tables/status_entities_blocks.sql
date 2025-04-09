CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `entity_block_id` smallint(5) unsigned NOT NULL,
  `status_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status_entities_blocks_entity_block_id_status_id_unique` (`entity_block_id`,`status_id`),
  KEY `status_entities_blocks_status_id_foreign` (`status_id`),
  CONSTRAINT `status_entities_blocks_entity_block_id_foreign` FOREIGN KEY (`entity_block_id`) REFERENCES `entity_block` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `status_entities_blocks_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
