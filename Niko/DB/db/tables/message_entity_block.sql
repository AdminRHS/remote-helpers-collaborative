CREATE TABLE $tableName (
  `message_id` smallint(5) unsigned NOT NULL,
  `entity_block_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `message_entity_block_message_id_entity_block_id_unique` (`message_id`,`entity_block_id`),
  KEY `message_entity_block_entity_block_id_foreign` (`entity_block_id`),
  CONSTRAINT `message_entity_block_entity_block_id_foreign` FOREIGN KEY (`entity_block_id`) REFERENCES `entity_block` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_entity_block_message_id_foreign` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
