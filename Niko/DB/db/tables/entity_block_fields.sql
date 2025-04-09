CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `entity_block_id` smallint(5) unsigned NOT NULL,
  `field_id` smallint(5) unsigned NOT NULL,
  `tooltip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entity_block_fields_entity_block_id_field_id_unique` (`entity_block_id`,`field_id`),
  KEY `entity_block_fields_field_id_foreign` (`field_id`),
  CONSTRAINT `entity_block_fields_entity_block_id_foreign` FOREIGN KEY (`entity_block_id`) REFERENCES `entity_block` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `entity_block_fields_field_id_foreign` FOREIGN KEY (`field_id`) REFERENCES `fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
