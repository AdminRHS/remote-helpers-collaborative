CREATE TABLE $tableName (
  `step_template_id` smallint(5) unsigned NOT NULL,
  `checklist_item_id` mediumint(8) unsigned NOT NULL,
  `order` mediumint(8) unsigned DEFAULT NULL,
  KEY `step_template_checklist_item_step_template_id_foreign` (`step_template_id`),
  KEY `step_template_checklist_item_checklist_item_id_foreign` (`checklist_item_id`),
  CONSTRAINT `step_template_checklist_item_checklist_item_id_foreign` FOREIGN KEY (`checklist_item_id`) REFERENCES `checklist_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `step_template_checklist_item_step_template_id_foreign` FOREIGN KEY (`step_template_id`) REFERENCES `step_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
