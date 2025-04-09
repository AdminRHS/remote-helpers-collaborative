CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `guide_id` mediumint(8) unsigned NOT NULL,
  `link` varchar(1500) DEFAULT NULL,
  `format_id` smallint(5) unsigned DEFAULT NULL,
  `object_id` bigint(20) unsigned DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guide_formats_guide_id_foreign` (`guide_id`),
  KEY `guide_formats_format_id_foreign` (`format_id`),
  KEY `guide_formats_object_id_foreign` (`object_id`),
  CONSTRAINT `guide_formats_format_id_foreign` FOREIGN KEY (`format_id`) REFERENCES `formats` (`id`) ON DELETE CASCADE,
  CONSTRAINT `guide_formats_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `guide_formats_object_id_foreign` FOREIGN KEY (`object_id`) REFERENCES `objects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
