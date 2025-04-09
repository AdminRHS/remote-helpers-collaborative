CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `communication_id` mediumint(8) unsigned NOT NULL,
  `message_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ja_communication_message_ja_communication_id_message_id_unique` (`communication_id`,`message_id`),
  KEY `ja_communication_message_message_id_foreign` (`message_id`),
  CONSTRAINT `ja_communication_message_ja_communication_id_foreign` FOREIGN KEY (`communication_id`) REFERENCES `communications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ja_communication_message_message_id_foreign` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
