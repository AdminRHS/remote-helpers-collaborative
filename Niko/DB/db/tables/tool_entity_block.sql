CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `entity_block_id` smallint(5) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tool_entity_block_entity_block_id_tool_id_unique` (`entity_block_id`,`tool_id`),
  KEY `tool_entity_block_tool_id_foreign` (`tool_id`),
  CONSTRAINT `tool_entity_block_entity_block_id_foreign` FOREIGN KEY (`entity_block_id`) REFERENCES `entity_block` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tool_entity_block_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
