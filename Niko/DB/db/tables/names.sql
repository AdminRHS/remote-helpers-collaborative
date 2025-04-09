CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `person_id` smallint(5) unsigned DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `translation_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `names_person_id_foreign` (`person_id`),
  KEY `names_translation_id_foreign` (`translation_id`),
  KEY `names_entity_id_foreign` (`entity_id`),
  CONSTRAINT `names_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `names_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `names_translation_id_foreign` FOREIGN KEY (`translation_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
