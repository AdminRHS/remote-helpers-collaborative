CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `icon` varchar(200) DEFAULT NULL,
  `color` varchar(100) NOT NULL DEFAULT '#1976d2',
  PRIMARY KEY (`id`)
)
