-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: coordinadora
-- ------------------------------------------------------
-- Server version	5.7.44

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
-- Current Database: `coordinadora`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `coordinadora` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `coordinadora`;

--
-- Current Database: `reto_coordinadora`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `reto_coordinadora` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `reto_coordinadora`;

--
-- Table structure for table `assistants`
--

DROP TABLE IF EXISTS `assistants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistants` (
  `idassistants` int(11) NOT NULL AUTO_INCREMENT,
  `users_idusers` int(11) NOT NULL,
  `events_idevents` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idassistants`),
  KEY `fk_assistants_users1_idx` (`users_idusers`),
  KEY `fk_assistants_events1_idx` (`events_idevents`),
  CONSTRAINT `fk_assistants_events1` FOREIGN KEY (`events_idevents`) REFERENCES `events` (`idevents`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_assistants_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistants`
--

LOCK TABLES `assistants` WRITE;
/*!40000 ALTER TABLE `assistants` DISABLE KEYS */;
INSERT INTO `assistants` VALUES (1,1,1,'2024-04-28 16:10:43','2024-04-28 16:10:43',NULL),(3,6,1,'2024-04-28 16:46:28','2024-04-28 16:46:28',NULL),(4,7,1,'2024-04-28 16:46:32','2024-04-28 16:46:32',NULL),(5,8,1,'2024-04-28 16:46:40','2024-04-28 16:46:40',NULL),(7,1,3,'2024-04-28 17:26:55','2024-04-28 17:26:55',NULL),(8,1,4,'2024-04-28 17:27:00','2024-04-28 17:27:00',NULL),(10,11,8,'2024-04-29 03:29:32','2024-04-29 03:29:32',NULL),(11,12,8,'2024-04-29 03:30:11','2024-04-29 03:30:11',NULL),(12,1,8,'2024-04-29 03:30:42','2024-04-29 03:30:42',NULL),(13,11,3,'2024-04-29 03:31:45','2024-04-29 03:31:45',NULL);
/*!40000 ALTER TABLE `assistants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_status`
--

DROP TABLE IF EXISTS `event_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_status` (
  `idevent_status` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idevent_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_status`
--

LOCK TABLES `event_status` WRITE;
/*!40000 ALTER TABLE `event_status` DISABLE KEYS */;
INSERT INTO `event_status` VALUES (1,'Open','2024-04-27 18:00:49','2024-04-27 18:00:49',NULL),(2,'Close','2024-04-27 18:00:49','2024-04-27 18:00:49',NULL),(3,'OnProgress','2024-04-27 18:00:49','2024-04-27 18:00:49',NULL),(4,'Canceled','2024-04-27 18:00:49','2024-04-27 18:00:49',NULL);
/*!40000 ALTER TABLE `event_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `idevents` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` longtext,
  `address` varchar(254) DEFAULT NULL,
  `max_capacity` int(11) NOT NULL,
  `event_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lat` varchar(45) DEFAULT NULL,
  `long` varchar(45) DEFAULT NULL,
  `event_status_idevent_status` int(11) NOT NULL,
  `users_idcreator` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idevents`),
  KEY `fk_events_event_status1_idx` (`event_status_idevent_status`),
  KEY `fk_events_users1_idx` (`users_idcreator`),
  CONSTRAINT `fk_events_event_status1` FOREIGN KEY (`event_status_idevent_status`) REFERENCES `event_status` (`idevent_status`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_events_users1` FOREIGN KEY (`users_idcreator`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Evento X',NULL,'Centro de enventos la Macarena, Medellin Ant.',1000,'2024-07-29 00:00:00','6.244338','-75.573553',1,1,'2024-04-27 20:51:30','2024-04-27 20:51:30',NULL),(2,'Evento New XI',NULL,'Universidad de Medellin',1250,'2024-04-29 03:08:32','6.2313405','-75.6106725',1,1,'2024-04-27 22:42:16','2024-04-27 22:42:16',NULL),(3,'Evento 1',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',1,'2024-07-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-28 02:45:49','2024-04-28 02:45:49',NULL),(4,'Evento 2',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',2,'2023-04-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-28 02:45:49','2024-04-28 02:45:49',NULL),(5,'Evento 3',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',3,'2024-04-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-28 02:45:49','2024-04-28 02:45:49',NULL),(6,'Evento 5',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',4,'2024-04-28 18:08:42','6.232882','-75.578816',1,5,'2024-04-28 02:45:49','2024-04-28 02:45:49',NULL),(7,'Evento 4','Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',NULL,3,'2024-04-28 18:08:42',NULL,NULL,1,5,'2024-04-28 02:45:49','2024-04-28 02:45:49',NULL),(8,'Lorem Ipsum','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Cra. 65 #59a-110, Medellín',2,'2024-04-29 03:27:43','6.259383','-75.58026',1,12,'2024-04-29 02:49:17','2024-04-29 02:49:17',NULL),(9,'Evento 6',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',1,'2024-05-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-29 03:23:40','2024-04-29 03:23:40',NULL),(10,'Evento 7',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',2,'2024-07-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-29 03:23:40','2024-04-29 03:23:40',NULL),(11,'Evento 8',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',3,'2024-05-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-29 03:23:40','2024-04-29 03:23:40',NULL),(12,'Evento 9','Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',NULL,3,'2024-05-25 00:00:00',NULL,NULL,1,1,'2024-04-29 03:23:40','2024-04-29 03:23:40',NULL),(13,'Evento 11','Descripcion ','Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',3,'2025-05-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-29 03:23:40','2024-04-29 03:23:40',NULL),(14,'Evento 10',NULL,'Cl. 30A #53-16, Medellín, Belén, Medellín, Antioquia',4,'2024-05-25 00:00:00','6.232882','-75.578816',1,1,'2024-04-29 03:23:40','2024-04-29 03:23:40',NULL);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idroles` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idroles`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'SuperAdmin','2024-04-27 16:57:02','2024-04-27 16:57:02',NULL),(2,'Admin','2024-04-27 16:57:02','2024-04-27 16:57:02',NULL),(3,'User','2024-04-27 16:57:02','2024-04-27 16:57:02',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `iduser_roles` int(11) NOT NULL AUTO_INCREMENT,
  `roles_idroles` int(11) NOT NULL,
  `users_idusers` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`iduser_roles`),
  KEY `fk_user_roles_roles_idx` (`roles_idroles`),
  KEY `fk_user_roles_users1_idx` (`users_idusers`),
  CONSTRAINT `fk_user_roles_roles` FOREIGN KEY (`roles_idroles`) REFERENCES `roles` (`idroles`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_roles_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,1,'2024-04-27 16:57:02','2024-04-27 16:57:02',NULL),(2,2,1,'2024-04-27 16:57:02','2024-04-27 16:57:02',NULL),(3,3,1,'2024-04-27 16:57:02','2024-04-27 16:57:02',NULL),(4,3,5,'2024-04-27 17:44:11','2024-04-27 17:44:11',NULL),(5,3,6,'2024-04-28 16:44:05','2024-04-28 16:44:05',NULL),(6,3,7,'2024-04-28 16:44:28','2024-04-28 16:44:28',NULL),(7,3,8,'2024-04-28 16:44:42','2024-04-28 16:44:42',NULL),(8,3,9,'2024-04-28 16:44:57','2024-04-28 16:44:57',NULL),(9,2,5,'2024-04-28 16:45:51','2024-04-28 16:45:51',NULL),(11,3,12,'2024-04-29 02:17:11','2024-04-29 02:17:11',NULL);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'SuperAdmin','SuperAdmin','superadmin@superadmin.com','$2b$10$lv6ZZw/iUtUvsCC.Zj0h2e5RjJMJVRTLdZl7iSG5qHlgTONg36Rlm','2024-04-27 16:57:02','2024-04-27 16:57:02',NULL),(5,'Yeison','montess','montes@gmail.com','$2b$10$yKEdFGQoQY5VkBmqP/8kJ.rSjIybh/1Mv3fII/vlSScoQY8uvH3ty','2024-04-27 17:44:11','2024-04-27 17:44:11',NULL),(6,'Andrea','Valencia','Valencia@gmail.com','$2b$10$1bKm6fJn0kM8G/QCndfdh.3e52zGDd26/WcdXQWWLWWphokiZLljG','2024-04-28 16:44:05','2024-04-28 16:44:05',NULL),(7,'Camilo','Bedoya','Bedoya@gmail.com','$2b$10$DYJUGgjG1WVpjoQWpRpfCOXmdjMbZnI7qst6gLbqRvArmlLICl7ay','2024-04-28 16:44:28','2024-04-28 16:44:28',NULL),(8,'Juan','pineda','pineda@gmail.com','$2b$10$VzHOZJ/DWLbYsyk4GHxXIuZtAguOclGvC61qsQRIZWe7mzbUCRT16','2024-04-28 16:44:42','2024-04-28 16:44:42',NULL),(9,'Carolina','Tobon','Tobon@gmail.com','$2b$10$qBlLBoyj3HyJ4ku5G4xBUemSVvj187tatdxpHAXDDb94t8H8ZgZGO','2024-04-28 16:44:57','2024-04-28 16:44:57',NULL),(11,'Natalia','Gomez','Gomez1@gmail.com','$2b$10$40fTl.nstY1T9m76sasGpu71/WkK1Q7dA1Y4x.Ey2SnSEB9KmnjOW','2024-04-29 02:14:55','2024-04-29 02:14:55',NULL),(12,'Natalia','Gomez','Gomez2@gmail.com','$2b$10$4ueft5hAbJLyuToI6qMBiufOGxXoH07DCtH0GSWvvLOAXlpe.NL2G','2024-04-29 02:17:11','2024-04-29 02:17:11',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 22:48:03
