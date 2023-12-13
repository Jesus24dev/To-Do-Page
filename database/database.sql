-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.4.21-MariaDB-log - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para todopage
CREATE DATABASE IF NOT EXISTS `todopage` /*!40100 DEFAULT CHARACTER SET utf32 COLLATE utf32_spanish2_ci */;
USE `todopage`;

-- Volcando estructura para tabla todopage.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `TASK_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NICKNAME` varchar(255) COLLATE utf32_spanish2_ci DEFAULT NULL,
  `TASK_DESCRIPTION` text COLLATE utf32_spanish2_ci DEFAULT NULL,
  `TASK_STATUS` bit(1) DEFAULT NULL,
  PRIMARY KEY (`TASK_ID`),
  KEY `FK_tasks_user` (`USER_NICKNAME`) USING BTREE,
  CONSTRAINT `FK_tasks_user` FOREIGN KEY (`USER_NICKNAME`) REFERENCES `user` (`NICKNAME`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

-- Volcando datos para la tabla todopage.tasks: ~0 rows (aproximadamente)

-- Volcando estructura para tabla todopage.user
CREATE TABLE IF NOT EXISTS `user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NICKNAME` varchar(255) COLLATE utf32_spanish2_ci DEFAULT NULL,
  `PASSWORD` varchar(255) COLLATE utf32_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `Índice 2` (`NICKNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

-- Volcando datos para la tabla todopage.user: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
