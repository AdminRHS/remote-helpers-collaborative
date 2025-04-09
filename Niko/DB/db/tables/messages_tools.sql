CREATE TABLE $tableName (
  `message_id` smallint(5) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `messages_tools_message_id_tool_id_unique` (`message_id`,`tool_id`),
  KEY `messages_tools_tool_id_foreign` (`tool_id`),
  CONSTRAINT `messages_tools_message_id_foreign` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_tools_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
