CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `iso` char(10) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `tax_number` varchar(200) DEFAULT NULL,
  `company_type_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inner_clients_entity_id_foreign` (`entity_id`),
  KEY `inner_clients_company_type_id_foreign` (`company_type_id`),
  CONSTRAINT `inner_clients_company_type_id_foreign` FOREIGN KEY (`company_type_id`) REFERENCES `company_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `inner_clients_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
