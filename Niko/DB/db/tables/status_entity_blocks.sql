CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `status_id` tinyint(3) unsigned NOT NULL,
  `entity_block_id` smallint(5) unsigned NOT NULL,
  `order` mediumint(8) unsigned DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status_entity_blocks_status_id_entity_block_id_unique` (`status_id`,`entity_block_id`),
  KEY `status_entity_blocks_entity_block_id_foreign` (`entity_block_id`),
  CONSTRAINT `status_entity_blocks_entity_block_id_foreign` FOREIGN KEY (`entity_block_id`) REFERENCES `entity_block` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `status_entity_blocks_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
