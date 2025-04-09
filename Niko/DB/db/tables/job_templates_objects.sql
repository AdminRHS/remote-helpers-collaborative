CREATE TABLE $tableName (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `job_template_id` smallint(5) unsigned NOT NULL,
  `object_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_templates_objects_job_template_id_object_id_unique` (`job_template_id`,`object_id`),
  KEY `job_templates_objects_object_id_foreign` (`object_id`),
  CONSTRAINT `job_templates_objects_job_template_id_foreign` FOREIGN KEY (`job_template_id`) REFERENCES `job_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_templates_objects_object_id_foreign` FOREIGN KEY (`object_id`) REFERENCES `objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
