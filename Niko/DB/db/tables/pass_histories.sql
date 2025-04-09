CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `job_account_id` smallint(5) unsigned DEFAULT NULL,
  `account_id` smallint(5) unsigned DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `next_change_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pass_histories_job_account_id_foreign` (`job_account_id`),
  KEY `pass_histories_account_id_foreign` (`account_id`),
  CONSTRAINT `pass_histories_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pass_histories_job_account_id_foreign` FOREIGN KEY (`job_account_id`) REFERENCES `job_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
