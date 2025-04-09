CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `profession_id` bigint(20) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profession_tool_profession_id_tool_id_unique` (`profession_id`,`tool_id`),
  KEY `profession_tool_tool_id_foreign` (`tool_id`),
  CONSTRAINT `profession_tool_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profession_tool_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
