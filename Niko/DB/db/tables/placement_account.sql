CREATE TABLE $tableName (
  `placement_id` mediumint(8) unsigned NOT NULL,
  `account_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `placement_account_placement_id_account_id_unique` (`placement_id`,`account_id`),
  KEY `placement_account_account_id_foreign` (`account_id`),
  CONSTRAINT `placement_account_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `placement_account_placement_id_foreign` FOREIGN KEY (`placement_id`) REFERENCES `placements` (`id`) ON DELETE CASCADE
)
