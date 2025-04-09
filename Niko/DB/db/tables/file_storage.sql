CREATE TABLE $tableName (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `size` int(10) unsigned NOT NULL,
  `storage_location` enum('local','aws_s3','digitalocean') NOT NULL DEFAULT 'local',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
