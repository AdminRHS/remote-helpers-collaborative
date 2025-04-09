CREATE TABLE $tableName (
  `job_request_id` mediumint(8) unsigned NOT NULL,
  `tool_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `job_request_tool_job_request_id_tool_id_unique` (`job_request_id`,`tool_id`),
  KEY `job_request_tool_tool_id_foreign` (`tool_id`),
  CONSTRAINT `job_request_tool_job_request_id_foreign` FOREIGN KEY (`job_request_id`) REFERENCES `job_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_request_tool_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
