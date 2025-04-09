CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` smallint(5) unsigned DEFAULT NULL,
  `job_account_id` smallint(5) unsigned DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `user_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_users_job_account_id_foreign` (`job_account_id`),
  KEY `account_users_account_id_foreign` (`account_id`),
  KEY `account_users_user_id_foreign` (`user_id`),
  CONSTRAINT `account_users_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `account_users_job_account_id_foreign` FOREIGN KEY (`job_account_id`) REFERENCES `job_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `account_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
