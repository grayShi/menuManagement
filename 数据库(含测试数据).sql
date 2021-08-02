-- MySQL dump 10.13  Distrib 5.7.34, for Win64 (x86_64)
--
-- Host: localhost    Database: menu
-- ------------------------------------------------------
-- Server version	5.7.34-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `childdesk`
--

DROP TABLE IF EXISTS `childdesk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `childdesk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deskName` varchar(100) NOT NULL,
  `parentId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `childdesk_FK` (`parentId`),
  CONSTRAINT `childdesk_FK` FOREIGN KEY (`parentId`) REFERENCES `desk` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `childdesk`
--

LOCK TABLES `childdesk` WRITE;
/*!40000 ALTER TABLE `childdesk` DISABLE KEYS */;
INSERT INTO `childdesk` VALUES (31,'大桌1',6,'2021-06-16 22:01:02','2021-06-16 22:01:02',NULL),(32,'大桌2',6,'2021-06-16 22:01:02','2021-06-16 22:01:02',NULL),(33,'大桌3',6,'2021-06-16 22:01:02','2021-06-16 22:01:02',NULL),(34,'大桌4',6,'2021-06-16 22:01:02','2021-06-16 22:01:02',NULL),(35,'大桌5',6,'2021-06-16 22:01:02','2021-06-16 22:01:02',NULL),(36,'小桌1',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(37,'小桌2',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(38,'小桌3',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(39,'小桌4',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(40,'小桌5',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(41,'小桌6',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(42,'小桌7',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(43,'小桌8',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(44,'小桌9',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL),(45,'小桌10',7,'2021-06-16 22:01:06','2021-06-16 22:01:06',NULL);
/*!40000 ALTER TABLE `childdesk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `childdish`
--

DROP TABLE IF EXISTS `childdish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `childdish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `parentId` int(11) NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `parentId` (`parentId`),
  CONSTRAINT `childDish_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `dish` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `childdish`
--

LOCK TABLES `childdish` WRITE;
/*!40000 ALTER TABLE `childdish` DISABLE KEYS */;
INSERT INTO `childdish` VALUES (1,'大鱼',1,20,2,'2021-06-14 14:40:53','2021-06-14 14:40:53',NULL),(2,'中鱼',1,15,8,'2021-06-14 14:40:53','2021-06-14 14:40:53',NULL),(3,'半只',2,15,20,'2021-06-14 14:42:44','2021-06-14 14:42:44',NULL),(4,'整只',2,30,20,'2021-06-14 14:42:44','2021-06-14 14:42:44',NULL);
/*!40000 ALTER TABLE `childdish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desk`
--

DROP TABLE IF EXISTS `desk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `number` int(11) NOT NULL,
  `restaurantId` int(11) NOT NULL,
  `seatAmount` int(11) NOT NULL,
  `peopleAmount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `restaurantId` (`restaurantId`),
  CONSTRAINT `desk_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desk`
--

LOCK TABLES `desk` WRITE;
/*!40000 ALTER TABLE `desk` DISABLE KEYS */;
INSERT INTO `desk` VALUES (6,'大桌',5,5,5,5,'2021-06-16 22:00:44','2021-06-16 22:01:02',NULL),(7,'小桌',10,5,2,2,'2021-06-16 22:00:56','2021-06-16 22:01:06',NULL);
/*!40000 ALTER TABLE `desk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish`
--

DROP TABLE IF EXISTS `dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `imageUri` varchar(128) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` double NOT NULL,
  `hasChild` tinyint(1) NOT NULL,
  `description` varchar(150) NOT NULL,
  `sectionId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `sectionId` (`sectionId`),
  CONSTRAINT `dish_FK` FOREIGN KEY (`sectionId`) REFERENCES `section` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish`
--

LOCK TABLES `dish` WRITE;
/*!40000 ALTER TABLE `dish` DISABLE KEYS */;
INSERT INTO `dish` VALUES (1,'酸菜鱼','http://127.0.0.1:7001/public/uploadImage/20210614/1623652818565.png',20,10,1,'好吃的酸菜鱼',1,'2021-06-14 14:40:20','2021-06-14 14:40:20',NULL),(2,'叫花鸡','http://127.0.0.1:7001/public/uploadImage/20210614/1623652939319.png',10,20,1,'好吃的叫花鸡',2,'2021-06-14 14:42:20','2021-06-14 14:42:20',NULL);
/*!40000 ALTER TABLE `dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdish`
--

DROP TABLE IF EXISTS `orderdish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdish` (
  `orderId` int(11) NOT NULL,
  `dishId` int(11) NOT NULL,
  `childDishId` int(11) NOT NULL,
  `price` double NOT NULL,
  `count` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`orderId`,`dishId`,`childDishId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdish`
--

LOCK TABLES `orderdish` WRITE;
/*!40000 ALTER TABLE `orderdish` DISABLE KEYS */;
INSERT INTO `orderdish` VALUES (1,1,1,60,3,'2021-06-14 22:45:23','2021-06-14 22:45:23',NULL),(1,2,3,15,1,'2021-06-14 22:45:23','2021-06-14 22:45:23',NULL),(2,1,1,20,1,'2021-06-14 22:53:24','2021-06-14 22:53:24',NULL),(3,1,2,165,11,'2021-06-14 23:01:28','2021-06-14 23:01:28',NULL),(6,1,1,20,1,'2021-06-16 22:20:21','2021-06-16 22:20:21',NULL),(7,1,1,20,1,'2021-06-16 22:26:42','2021-06-16 22:26:42',NULL);
/*!40000 ALTER TABLE `orderdish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `totalPrice` double NOT NULL,
  `orderedBy` int(11) NOT NULL,
  `restaurantServiceId` int(11) DEFAULT NULL,
  `restaurantChildDeskId` int(11) NOT NULL,
  `restaurantId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `orderStatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  UNIQUE KEY `orderId` (`orderId`),
  KEY `orderedBy` (`orderedBy`),
  KEY `restaurantDeskId` (`restaurantChildDeskId`),
  KEY `restaurantId` (`restaurantId`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`restaurantChildDeskId`) REFERENCES `childdesk` (`id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`orderedBy`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (6,20,7,1,31,5,'2021-06-16 22:20:21','2021-06-16 22:33:34',NULL,3),(7,20,7,1,33,5,'2021-06-16 22:26:42','2021-06-16 22:26:42',NULL,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurantName` varchar(20) NOT NULL,
  `subName` varchar(20) NOT NULL,
  `restaurantLogoUri` varchar(128) NOT NULL,
  `managerId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (5,'我的第一家餐厅','有滋有味','http://127.0.0.1:7001/public/uploadImage/20210614/1623600605333.png',7,'2021-06-14 00:11:01','2021-06-14 00:11:01',NULL),(8,'我的第二家餐厅','八合里','http://127.0.0.1:7001/public/uploadImage/20210614/1623607574331.png',7,'2021-06-14 02:06:15','2021-06-14 02:06:15',NULL);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `imageUri` varchar(128) NOT NULL,
  `restaurantId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `restaurantId` (`restaurantId`),
  CONSTRAINT `section_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'鱼类','http://127.0.0.1:7001/public/uploadImage/20210614/1623652733023.png',5,'2021-06-14 14:38:54','2021-06-14 14:39:26',NULL),(2,'肉类','http://127.0.0.1:7001/public/uploadImage/20210614/1623652745674.png',5,'2021-06-14 14:39:00','2021-06-14 14:39:44',NULL);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `restaurantId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `restaurantId` (`restaurantId`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'餐具套装',5,'2021-06-14 14:46:25','2021-06-14 14:46:42',NULL);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `restaurantId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isManager` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`restaurantId`,`userId`),
  UNIQUE KEY `staff_userId_restaurantId_unique` (`restaurantId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (5,7,1,'2021-06-14 00:11:01','2021-06-14 00:11:01',NULL),(5,11,0,'2021-06-14 12:10:58','2021-06-14 12:10:58',NULL),(8,7,1,'2021-06-14 02:06:15','2021-06-14 02:06:15',NULL);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(256) NOT NULL,
  `hasRestaurant` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'admin','21232f297a57a5a743894a0e4a801fc3',1,'2021-06-14 00:11:01','2021-06-14 00:11:01'),(11,'staff1','4d7d719ac0cf3d78ea8a94701913fe47',0,'2021-06-14 12:10:58','2021-06-14 12:10:58');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'menu'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-16 23:31:40
