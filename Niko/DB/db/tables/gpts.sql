CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  `type` enum('custom','assistant','webhook') DEFAULT NULL,
  `owner_id` smallint(5) unsigned DEFAULT NULL,
  `custom_instructions_link` varchar(1000) DEFAULT NULL,
  `created_by` smallint(5) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `gpts_entity_id_foreign` (`entity_id`),
  KEY `gpts_owner_id_foreign` (`owner_id`),
  KEY `gpts_created_by_foreign` (`created_by`),
  CONSTRAINT `gpts_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gpts_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `gpts_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
