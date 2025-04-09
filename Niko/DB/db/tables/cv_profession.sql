CREATE TABLE $tableName (
  `cv_id` mediumint(8) unsigned DEFAULT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `cv_profession_cv_id_profession_id_unique` (`cv_id`,`profession_id`),
  KEY `cv_profession_profession_id_foreign` (`profession_id`),
  CONSTRAINT `cv_profession_cv_id_foreign` FOREIGN KEY (`cv_id`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cv_profession_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE
)
