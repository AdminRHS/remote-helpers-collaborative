CREATE TABLE $tableName (
  `job_request_id` mediumint(8) unsigned NOT NULL,
  `task_template_id` smallint(5) unsigned NOT NULL,
  UNIQUE KEY `job_req_task_tpl_unique` (`job_request_id`,`task_template_id`),
  KEY `job_request_task_templates_task_template_id_foreign` (`task_template_id`),
  CONSTRAINT `job_request_task_templates_job_request_id_foreign` FOREIGN KEY (`job_request_id`) REFERENCES `job_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_request_task_templates_task_template_id_foreign` FOREIGN KEY (`task_template_id`) REFERENCES `task_templates` (`id`) ON DELETE CASCADE
)
