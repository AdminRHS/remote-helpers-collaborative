CREATE TABLE $tableName (
  `gpt_id` smallint(5) unsigned NOT NULL,
  `link_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `gpt_links_gpt_id_link_id_unique` (`gpt_id`,`link_id`),
  KEY `gpt_links_link_id_foreign` (`link_id`),
  CONSTRAINT `gpt_links_gpt_id_foreign` FOREIGN KEY (`gpt_id`) REFERENCES `gpts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `gpt_links_link_id_foreign` FOREIGN KEY (`link_id`) REFERENCES `links` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
