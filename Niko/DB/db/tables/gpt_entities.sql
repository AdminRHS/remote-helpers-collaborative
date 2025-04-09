CREATE TABLE $tableName (
  `gpt_id` smallint(5) unsigned NOT NULL,
  `entity_id` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `gpt_entities_gpt_id_entity_id_unique` (`gpt_id`,`entity_id`),
  KEY `gpt_entities_entity_id_foreign` (`entity_id`),
  CONSTRAINT `gpt_entities_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gpt_entities_gpt_id_foreign` FOREIGN KEY (`gpt_id`) REFERENCES `gpts` (`id`) ON DELETE CASCADE
)
