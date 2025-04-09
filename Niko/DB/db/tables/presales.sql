CREATE TABLE $tableName (
  `talent_id` smallint(5) unsigned NOT NULL,
  `person_id` smallint(5) unsigned NOT NULL,
  KEY `presales_talent_id_foreign` (`talent_id`),
  KEY `presales_person_id_foreign` (`person_id`),
  CONSTRAINT `presales_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `presales_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
