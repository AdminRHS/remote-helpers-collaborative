CREATE TABLE $tableName (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(3000) NOT NULL,
  `content_type_id` tinyint(3) unsigned DEFAULT NULL,
  `person_id` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contents_content_type_id_foreign` (`content_type_id`),
  KEY `contents_person_id_foreign` (`person_id`),
  CONSTRAINT `contents_content_type_id_foreign` FOREIGN KEY (`content_type_id`) REFERENCES `content_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contents_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
