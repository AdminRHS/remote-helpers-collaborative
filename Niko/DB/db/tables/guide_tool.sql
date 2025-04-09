CREATE TABLE $tableName (
  `guide_id` mediumint(8) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `guide_tool_guide_id_tool_id_unique` (`guide_id`,`tool_id`),
  KEY `guide_tool_tool_id_foreign` (`tool_id`),
  CONSTRAINT `guide_tool_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `guide_tool_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
