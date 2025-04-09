CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `tool_id` smallint(5) unsigned DEFAULT NULL,
  `value` varchar(100) NOT NULL,
  `contactable_type` varchar(255) NOT NULL,
  `contactable_id` bigint(20) unsigned NOT NULL,
  `located_at_id` tinyint(3) unsigned DEFAULT NULL,
  `block_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_tool_id_foreign` (`tool_id`),
  KEY `contacts_contactable_type_contactable_id_index` (`contactable_type`,`contactable_id`),
  KEY `contacts_located_at_id_foreign` (`located_at_id`),
  KEY `contacts_block_id_foreign` (`block_id`),
  CONSTRAINT `contacts_block_id_foreign` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contacts_located_at_id_foreign` FOREIGN KEY (`located_at_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contacts_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
