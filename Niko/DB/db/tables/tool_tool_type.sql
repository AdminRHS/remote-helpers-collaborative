CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `tool_id` smallint(5) unsigned NOT NULL,
  `tool_type_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tool_tool_type_tool_id_tool_type_id_unique` (`tool_id`,`tool_type_id`),
  KEY `tool_tool_type_tool_type_id_foreign` (`tool_type_id`),
  CONSTRAINT `tool_tool_type_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tool_tool_type_tool_type_id_foreign` FOREIGN KEY (`tool_type_id`) REFERENCES `tool_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
