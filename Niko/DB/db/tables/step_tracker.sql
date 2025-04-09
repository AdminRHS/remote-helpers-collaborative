CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `step_id` mediumint(8) unsigned DEFAULT NULL,
  `user_id` smallint(5) unsigned DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `total_time` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id`),
  KEY `step_tracker_step_id_foreign` (`step_id`),
  KEY `step_tracker_user_id_foreign` (`user_id`),
  CONSTRAINT `step_tracker_step_id_foreign` FOREIGN KEY (`step_id`) REFERENCES `steps` (`id`) ON DELETE SET NULL,
  CONSTRAINT `step_tracker_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
)
