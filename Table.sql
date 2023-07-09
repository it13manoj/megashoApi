CREATE TABLE `roles` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ;

CREATE TABLE `users` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` bigInt NOT NULL,
  `address` longtext,
  `gender` int DEFAULT 1 NOT NULL,
  `dob` date NOT NULL,
  `images` varchar(255) NOT NULL,
  `status` int DEFAULT '1',
  `role` enum('1','2','3','4','5') DEFAULT '1',
  PRIMARY KEY (`_id`)
) ;

CREATE TABLE `categories` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `images` varchar(255) NOT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`_id`)
) ;

CREATE TABLE `products` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` float NOT NULL,
  `discount` float NOT NULL,
  `images` varchar(255) NOT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`_id`)
  FOREIGN KEY ('category_id') REFERENCES categories(_id)
) ;

CREATE TABLE `templates` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `project_id` int NOT NULL,
  `description` longtext NOT NULL,
  `images` varchar(255) NOT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`_id`)
  FOREIGN KEY ('category_id') REFERENCES categories(_id)
  FOREIGN KEY ('project_id') REFERENCES categories(_id)
) ;