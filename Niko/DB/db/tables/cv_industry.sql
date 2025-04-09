CREATE TABLE $tableName (
  `cv_id` mediumint(8) unsigned DEFAULT NULL,
  `industry_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `cv_industry_cv_id_industry_id_unique` (`cv_id`,`industry_id`),
  KEY `cv_industry_industry_id_foreign` (`industry_id`),
  CONSTRAINT `cv_industry_cv_id_foreign` FOREIGN KEY (`cv_id`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cv_industry_industry_id_foreign` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
