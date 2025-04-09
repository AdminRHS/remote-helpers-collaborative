CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `display_name` varchar(200) NOT NULL,
  `position_id` bigint(20) unsigned DEFAULT NULL,
  `profession_id` bigint(20) unsigned DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roles_profession_id_foreign` (`profession_id`),
  KEY `position_profession_index` (`position_id`,`profession_id`),
  CONSTRAINT `roles_position_id_foreign` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `roles_profession_id_foreign` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
