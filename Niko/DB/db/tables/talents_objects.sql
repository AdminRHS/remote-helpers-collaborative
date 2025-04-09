CREATE TABLE $tableName (
  `talent_id` smallint(5) unsigned NOT NULL,
  `object_id` bigint(20) unsigned NOT NULL,
  KEY `talents_objects_talent_id_foreign` (`talent_id`),
  KEY `talents_objects_object_id_foreign` (`object_id`),
  CONSTRAINT `talents_objects_object_id_foreign` FOREIGN KEY (`object_id`) REFERENCES `objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `talents_objects_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
