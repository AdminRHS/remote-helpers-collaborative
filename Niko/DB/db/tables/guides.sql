CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `status_id` tinyint(3) unsigned DEFAULT NULL,
  `type_id` bigint(20) unsigned DEFAULT NULL,
  `created_by` smallint(5) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guides_entity_id_foreign` (`entity_id`),
  KEY `guides_created_by_foreign` (`created_by`),
  KEY `guides_status_id_foreign` (`status_id`),
  KEY `guides_type_id_foreign` (`type_id`),
  CONSTRAINT `guides_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `guides_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `guides_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `guides_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `objects` (`id`) ON DELETE SET NULL
)
