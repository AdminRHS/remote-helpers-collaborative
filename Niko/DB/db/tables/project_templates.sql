CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `is_draft` tinyint(1) NOT NULL DEFAULT 0,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `hours` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `project_templates_entity_id_foreign` (`entity_id`),
  CONSTRAINT `project_templates_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE CASCADE
)
