CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `commentable_type` varchar(255) NOT NULL,
  `commentable_id` bigint(20) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `comment_type_id` tinyint(3) unsigned DEFAULT NULL,
  `note` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_commentable_type_commentable_id_index` (`commentable_type`,`commentable_id`),
  KEY `comments_comment_type_id_foreign` (`comment_type_id`),
  KEY `comments_created_by_foreign` (`created_by`),
  CONSTRAINT `comments_comment_type_id_foreign` FOREIGN KEY (`comment_type_id`) REFERENCES `comment_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
