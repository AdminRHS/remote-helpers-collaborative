CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL DEFAULT '#ff0000',
  PRIMARY KEY (`id`)
)
