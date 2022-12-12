-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: bank_database
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `fk_account_id` int NOT NULL,
  `amount` float NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `type` enum('withdraw','deposit') NOT NULL,
  `purchase_sector` varchar(45) NOT NULL,
  `fk_loan_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`),
  KEY `fk_account_id_idx` (`fk_account_id`),
  KEY `loan_id_idx` (`fk_loan_id`),
  CONSTRAINT `fk_account_id` FOREIGN KEY (`fk_account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `fk_loan_id` FOREIGN KEY (`fk_loan_id`) REFERENCES `loan` (`loan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1,52,'2021-10-17 15:40:10','Chevron','withdraw','transportation',NULL),(2,2,124.54,'2022-02-14 12:36:10','McDonald\'s','withdraw','food and drink',NULL),(3,2,35,'2022-12-03 12:27:43','Target','withdraw','shopping',NULL),(4,2,24,'2022-11-27 16:02:53','QT','withdraw','transportation',NULL),(5,2,68,'2022-12-05 09:54:26','Vanguard','withdraw','other',NULL),(6,2,89.76,'2022-12-05 13:00:06','Ticketmaster','withdraw','shopping',NULL),(7,1,55.34,'2022-11-24 11:26:15','Zaxby\'s','withdraw','food and drink',NULL),(8,1,78.02,'2022-12-07 22:57:20','Walmart','withdraw','shopping',NULL),(9,1,230.55,'2022-11-14 23:00:01',NULL,'withdraw','other',NULL),(10,1,987,'2022-12-08 12:30:20',NULL,'deposit','other',NULL),(11,3,987,'2022-12-08 12:30:20',NULL,'withdraw','other',NULL),(12,1,987,'2022-12-08 12:30:20',NULL,'deposit','other',NULL),(13,3,987,'2022-12-08 12:30:20',NULL,'withdraw','other',NULL),(14,3,123,'2022-12-08 12:30:20',NULL,'deposit','other',NULL),(15,1,123,'2022-12-08 12:30:20',NULL,'withdraw','other',NULL),(16,1,123,'2022-12-08 12:30:20',NULL,'deposit','other',NULL),(17,3,123,'2022-12-08 12:30:20',NULL,'withdraw','other',NULL),(18,1,123,'2022-12-08 12:30:20',NULL,'deposit','other',NULL),(19,3,123,'2022-12-08 12:30:20',NULL,'withdraw','other',NULL),(20,2,10000,'2022-12-08 12:30:20',NULL,'deposit','other',NULL),(21,4,10000,'2022-12-08 12:30:20',NULL,'withdraw','other',NULL),(22,2,10000,'2022-12-08 12:30:20',NULL,'deposit','other',NULL),(23,4,10000,'2022-12-08 12:30:20',NULL,'withdraw','other',NULL);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-12 16:47:54
