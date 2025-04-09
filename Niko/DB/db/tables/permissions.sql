CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `entity_id` tinyint(3) unsigned NOT NULL,
  `is_custom` tinyint(1) NOT NULL,
  `allowed_permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`allowed_permissions`)),
  PRIMARY KEY (`id`),
  KEY `permissions_entity_id_foreign` (`entity_id`),
  CONSTRAINT `permissions_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
