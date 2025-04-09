CREATE TABLE $tableName (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filesystem` varchar(255) NOT NULL,
  `auth_keys` text DEFAULT NULL,
  `status` enum('enabled','disabled') NOT NULL DEFAULT 'disabled',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
