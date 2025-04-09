CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `talent_id` smallint(5) unsigned NOT NULL,
  `position_id` bigint(20) unsigned DEFAULT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  `priority_id` tinyint(3) unsigned DEFAULT NULL,
  `is_permission` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `talent_professions_talent_id_foreign` (`talent_id`),
  KEY `talent_professions_priority_id_foreign` (`priority_id`),
  KEY `talent_professions_profession_id_foreign` (`profession_id`),
  KEY `talent_professions_position_id_foreign` (`position_id`),
  CONSTRAINT `talent_professions_position_id_foreign` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `talent_professions_priority_id_foreign` FOREIGN KEY (`priority_id`) REFERENCES `priorities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `talent_professions_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `talent_professions_talent_id_foreign` FOREIGN KEY (`talent_id`) REFERENCES `talents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
