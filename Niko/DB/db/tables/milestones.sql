CREATE TABLE $tableName (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `milestone_template_id` bigint(20) unsigned DEFAULT NULL,
  `project_id` smallint(5) unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `expected_hours` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id`),
  KEY `milestones_milestone_template_id_foreign` (`milestone_template_id`),
  KEY `milestones_project_id_foreign` (`project_id`),
  CONSTRAINT `milestones_milestone_template_id_foreign` FOREIGN KEY (`milestone_template_id`) REFERENCES `milestone_templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `milestones_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)
