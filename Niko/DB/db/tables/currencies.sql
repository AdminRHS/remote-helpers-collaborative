CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `iso3` varchar(50) DEFAULT NULL,
  `symbol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
