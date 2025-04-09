CREATE TABLE $tableName (
  `link_id` mediumint(8) unsigned NOT NULL,
  `profession_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `link_profession_link_id_profession_id_unique` (`link_id`,`profession_id`),
  KEY `link_profession_profession_id_foreign` (`profession_id`),
  CONSTRAINT `link_profession_link_id_foreign` FOREIGN KEY (`link_id`) REFERENCES `links` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_profession_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE CASCADE
)
