CREATE TABLE $tableName (
  `entity_block_id` smallint(5) unsigned NOT NULL,
  `communication_type_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`entity_block_id`,`communication_type_id`),
  KEY `communication_type_entity_blocks_communication_type_id_foreign` (`communication_type_id`),
  CONSTRAINT `communication_type_entity_blocks_communication_type_id_foreign` FOREIGN KEY (`communication_type_id`) REFERENCES `communication_type` (`id`) ON DELETE CASCADE,
  CONSTRAINT `communication_type_entity_blocks_entity_block_id_foreign` FOREIGN KEY (`entity_block_id`) REFERENCES `entity_block` (`id`) ON DELETE CASCADE
)
