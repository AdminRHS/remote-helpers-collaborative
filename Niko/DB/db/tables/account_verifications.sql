CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` smallint(5) unsigned NOT NULL,
  `verification_account_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_verifications_account_id_verification_account_id_unique` (`account_id`,`verification_account_id`),
  KEY `account_verifications_verification_account_id_foreign` (`verification_account_id`),
  CONSTRAINT `account_verifications_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `account_verifications_verification_account_id_foreign` FOREIGN KEY (`verification_account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
