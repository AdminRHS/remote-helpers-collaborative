CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `translation_id` bigint(20) unsigned DEFAULT NULL,
  `inner_client_id` tinyint(3) unsigned DEFAULT NULL,
  `short_code` varchar(100) DEFAULT NULL,
  `message_type_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_inner_client_id_foreign` (`inner_client_id`),
  KEY `messages_message_type_id_foreign` (`message_type_id`),
  KEY `messages_translation_id_foreign` (`translation_id`),
  FULLTEXT KEY `text` (`text`),
  CONSTRAINT `messages_inner_client_id_foreign` FOREIGN KEY (`inner_client_id`) REFERENCES `inner_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_message_type_id_foreign` FOREIGN KEY (`message_type_id`) REFERENCES `message_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_translation_id_foreign` FOREIGN KEY (`translation_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
