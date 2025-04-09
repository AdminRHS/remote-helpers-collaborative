CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `link_id` mediumint(8) unsigned NOT NULL,
  `destinationable_type` varchar(255) NOT NULL,
  `destinationable_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `links_destinations_link_id_foreign` (`link_id`),
  KEY `links_destinations_destinationable_type_destinationable_id_index` (`destinationable_type`,`destinationable_id`),
  CONSTRAINT `links_destinations_link_id_foreign` FOREIGN KEY (`link_id`) REFERENCES `links` (`id`) ON DELETE CASCADE
)
