CREATE TABLE $tableName (
  `format_id` smallint(5) unsigned NOT NULL,
  `object_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `object_format_format_id_object_id_unique` (`format_id`,`object_id`),
  KEY `object_format_object_id_foreign` (`object_id`),
  CONSTRAINT `object_format_format_id_foreign` FOREIGN KEY (`format_id`) REFERENCES `formats` (`id`) ON DELETE CASCADE,
  CONSTRAINT `object_format_object_id_foreign` FOREIGN KEY (`object_id`) REFERENCES `objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
