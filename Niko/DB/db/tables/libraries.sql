﻿CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `priority_id` tinyint(3) unsigned DEFAULT NULL,
  `library_id` mediumint(8) unsigned DEFAULT NULL,
  `status_id` tinyint(3) unsigned DEFAULT NULL,
  `translation_id` bigint(20) unsigned DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `image_icon` varchar(300) DEFAULT NULL,
  `created_by` smallint(5) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `libraries_entity_id_foreign` (`entity_id`),
  KEY `libraries_priority_id_foreign` (`priority_id`),
  KEY `libraries_library_id_foreign` (`library_id`),
  KEY `libraries_status_id_foreign` (`status_id`),
  KEY `libraries_created_by_foreign` (`created_by`),
  KEY `libraries_translation_id_foreign` (`translation_id`),
  CONSTRAINT `libraries_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `libraries_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `libraries_library_id_foreign` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `libraries_priority_id_foreign` FOREIGN KEY (`priority_id`) REFERENCES `priorities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `libraries_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `libraries_translation_id_foreign` FOREIGN KEY (`translation_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
