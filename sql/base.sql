/*
SQLyog Community v9.63 
MySQL - 5.5.22 : Database - hiptests
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hiptests` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `hiptests`;

/*Table structure for table `asignaturas` */

DROP TABLE IF EXISTS `asignaturas`;

CREATE TABLE `asignaturas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `asignatura` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `planes` */

DROP TABLE IF EXISTS `planes`;

CREATE TABLE `planes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plan` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `preguntas` */

DROP TABLE IF EXISTS `preguntas`;

CREATE TABLE `preguntas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_asignatura` int(10) unsigned NOT NULL,
  `id_plan` int(10) unsigned NOT NULL,
  `contenido` text NOT NULL,
  `validada` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `respuestas` */

DROP TABLE IF EXISTS `respuestas`;

CREATE TABLE `respuestas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_pregunta` int(10) unsigned NOT NULL,
  `contenido` text NOT NULL,
  `correcta` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
