﻿CREATE TABLE $tableName (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `communicationable_type` varchar(255) NOT NULL,
  `communicationable_id` bigint(20) unsigned NOT NULL,
  `account_id` smallint(5) unsigned DEFAULT NULL,
  `channel_id` mediumint(8) unsigned DEFAULT NULL,
  `created_by` smallint(5) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `communication_type_id` tinyint(3) unsigned DEFAULT NULL,
  `followup_date` date NOT NULL,
  `followup_time` time DEFAULT NULL,
  `note` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ja_communications_created_by_foreign` (`created_by`),
  KEY `ja_communications_account_id_foreign` (`account_id`),
  KEY `ja_communications_communication_type_id_foreign` (`communication_type_id`),
  KEY `ja_communications_channel_id_foreign` (`channel_id`),
  KEY `communicationable_index` (`communicationable_type`,`communicationable_id`),
  CONSTRAINT `ja_communications_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ja_communications_channel_id_foreign` FOREIGN KEY (`channel_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ja_communications_communication_type_id_foreign` FOREIGN KEY (`communication_type_id`) REFERENCES `communication_type` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ja_communications_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
