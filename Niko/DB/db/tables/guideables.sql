CREATE TABLE $tableName (
  `guide_id` mediumint(8) unsigned NOT NULL,
  `guideable_type` varchar(255) NOT NULL,
  `guideable_id` bigint(20) unsigned NOT NULL,
  KEY `guideables_guide_id_foreign` (`guide_id`),
  KEY `guideables_guideable_type_guideable_id_index` (`guideable_type`,`guideable_id`),
  CONSTRAINT `guideables_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
