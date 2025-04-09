CREATE TABLE $tableName (
  `project_template_id` smallint(5) unsigned NOT NULL,
  `milestone_template_id` bigint(20) unsigned NOT NULL,
  UNIQUE KEY `milestone_project_unique` (`project_template_id`,`milestone_template_id`),
  KEY `ptmt_milestone_template_fk` (`milestone_template_id`),
  CONSTRAINT `ptmt_milestone_template_fk` FOREIGN KEY (`milestone_template_id`) REFERENCES `milestone_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ptmt_project_template_fk` FOREIGN KEY (`project_template_id`) REFERENCES `project_templates` (`id`) ON DELETE CASCADE
)
