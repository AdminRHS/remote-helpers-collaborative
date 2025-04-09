CREATE TABLE $tableName (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `mail_driver` varchar(191) NOT NULL DEFAULT 'smtp',
  `mail_host` varchar(191) NOT NULL DEFAULT 'smtp.gmail.com',
  `mail_port` varchar(191) NOT NULL DEFAULT '587',
  `mail_username` varchar(191) NOT NULL DEFAULT 'youremail@gmail.com',
  `mail_password` varchar(191) NOT NULL DEFAULT 'your password',
  `mail_from_name` varchar(191) NOT NULL DEFAULT 'your name',
  `mail_from_email` varchar(191) NOT NULL DEFAULT 'from@email.com',
  `mail_encryption` enum('ssl','tls','starttls') DEFAULT 'tls',
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `mail_connection` enum('sync','database') NOT NULL DEFAULT 'sync',
  PRIMARY KEY (`id`)
)
