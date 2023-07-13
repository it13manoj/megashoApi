-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: megashops
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `price` decimal(10,0) NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '1',
  `url` varchar(255) NOT NULL,
  `brand_id` int NOT NULL,
  `imageurl` longtext NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `category_id` (`category_id`),
  KEY `brand_idx` (`brand_id`),
  CONSTRAINT `brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,4,'Helio G37',NULL,'Tecno Spark 9 (Infinity Black, 4GB RAM,64GB Storage) | 7GB Expandable RAM | Helio G37 Gaming Processor',7999,30,NULL,1,'https://amzn.to/3pxqKxP',1,'<a href=\"https://www.amazon.in/Tecno-Spark-Infinity-Expandable-Processor/dp/B0B56YWX99?keywords=android+phone&qid=1688882967&sprefix=android%2Caps%2C583&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=li2&tag=pinkimks-21&linkId=8e073c10e59f1a7bd5fe1d72a58e4c9d&language=en_IN&ref_=as_li_ss_il\" target=\"_blank\"><img border=\"0\" src=\"//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0B56YWX99&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=pinkimks-21&language=en_IN\" ></a><img src=\"https://ir-in.amazon-adsystem.com/e/ir?t=pinkimks-21&language=en_IN&l=li2&o=31&a=B0B56YWX99\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />'),(4,5,'Helio G37',NULL,'Tecno Spark 9 (Infinity Black, 4GB RAM,64GB Storage) | 7GB Expandable RAM | Helio G37 Gaming Processor',7999,30,NULL,1,'https://amzn.to/3pxqKxP',1,'<a href=\"https://www.amazon.in/Tecno-Spark-Infinity-Expandable-Processor/dp/B0B56YWX99?keywords=android+phone&qid=1688882967&sprefix=android%2Caps%2C583&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=li2&tag=pinkimks-21&linkId=8e073c10e59f1a7bd5fe1d72a58e4c9d&language=en_IN&ref_=as_li_ss_il\" target=\"_blank\"><img border=\"0\" src=\"//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0B56YWX99&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=pinkimks-21&language=en_IN\" ></a><img src=\"https://ir-in.amazon-adsystem.com/e/ir?t=pinkimks-21&language=en_IN&l=li2&o=31&a=B0B56YWX99\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" style=\"border:none !important; margin:0px !important;\" />');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-13 23:12:48
