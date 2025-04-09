CREATE TABLE $tableName (
  `job_application_id` mediumint(8) unsigned NOT NULL,
  `sourceable_type` varchar(255) NOT NULL,
  `sourceable_id` bigint(20) unsigned NOT NULL,
  KEY `sourceables_job_application_id_foreign` (`job_application_id`),
  KEY `sourceables_sourceable_type_sourceable_id_index` (`sourceable_type`,`sourceable_id`),
  CONSTRAINT `sourceables_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
