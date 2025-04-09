CREATE TABLE $tableName (
  `talent_id` smallint(5) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `talent_tools_talent_id_tool_id_unique` (`talent_id`,`tool_id`),
  KEY `talent_tools_tool_id_foreign` (`tool_id`),
  CONSTRAINT `talent_tools_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `talent_tools_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
