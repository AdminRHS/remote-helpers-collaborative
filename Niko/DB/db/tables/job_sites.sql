CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` tinyint(3) unsigned DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `website` varchar(100) NOT NULL,
  `created_by` smallint(5) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `note` varchar(255) DEFAULT NULL,
  `sum_job_accs` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `job_sites_entity_id_foreign` (`entity_id`),
  KEY `job_sites_created_by_foreign` (`created_by`),
  CONSTRAINT `job_sites_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `job_sites_entity_id_foreign` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
