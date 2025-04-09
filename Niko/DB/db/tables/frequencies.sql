CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `days_num` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
)
