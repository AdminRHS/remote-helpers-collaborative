CREATE TABLE $tableName (
  `guide_id` mediumint(8) unsigned NOT NULL,
  `object_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `guide_object_guide_id_object_id_unique` (`guide_id`,`object_id`),
  KEY `guide_object_object_id_foreign` (`object_id`),
  CONSTRAINT `guide_object_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `guide_object_object_id_foreign` FOREIGN KEY (`object_id`) REFERENCES `objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
