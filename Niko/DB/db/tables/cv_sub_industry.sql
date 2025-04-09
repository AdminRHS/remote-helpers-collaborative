CREATE TABLE $tableName (
  `cv_id` mediumint(8) unsigned DEFAULT NULL,
  `sub_industry_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `cv_sub_industry_cv_id_sub_industry_id_unique` (`cv_id`,`sub_industry_id`),
  KEY `cv_sub_industry_sub_industry_id_foreign` (`sub_industry_id`),
  CONSTRAINT `cv_sub_industry_cv_id_foreign` FOREIGN KEY (`cv_id`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cv_sub_industry_sub_industry_id_foreign` FOREIGN KEY (`sub_industry_id`) REFERENCES `sub_industries` (`id`) ON DELETE CASCADE
)
