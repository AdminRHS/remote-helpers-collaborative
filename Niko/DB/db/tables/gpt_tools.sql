CREATE TABLE $tableName (
  `gpt_id` smallint(5) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `gpt_tools_gpt_id_tool_id_unique` (`gpt_id`,`tool_id`),
  KEY `gpt_tools_tool_id_foreign` (`tool_id`),
  CONSTRAINT `gpt_tools_gpt_id_foreign` FOREIGN KEY (`gpt_id`) REFERENCES `gpts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `gpt_tools_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
