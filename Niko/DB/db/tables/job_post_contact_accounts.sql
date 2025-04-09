CREATE TABLE $tableName (
  `job_post_id` mediumint(8) unsigned NOT NULL,
  `contact_account_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `job_post_contact_accounts_job_post_id_contact_account_id_unique` (`job_post_id`,`contact_account_id`),
  KEY `job_post_contact_accounts_contact_account_id_foreign` (`contact_account_id`),
  CONSTRAINT `job_post_contact_accounts_contact_account_id_foreign` FOREIGN KEY (`contact_account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_post_contact_accounts_job_post_id_foreign` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
