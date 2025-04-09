CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `job_account_id` smallint(5) unsigned NOT NULL,
  `account_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_account_verification_job_account_id_account_id_unique` (`job_account_id`,`account_id`),
  KEY `job_account_verification_account_id_foreign` (`account_id`),
  CONSTRAINT `job_account_verification_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_account_verification_job_account_id_foreign` FOREIGN KEY (`job_account_id`) REFERENCES `job_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
