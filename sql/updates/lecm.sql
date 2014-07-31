/*
SQLyog Community v11.52 (64 bit)
MySQL - 5.6.16 : Database - hiptests
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

/*Data for the table `asignaturas` */

insert  into `asignaturas`(`id`,`asignatura`) values (1,'LECM');

/*Data for the table `planes` */

insert  into `planes`(`id`,`plan`) values (1,'2010'),(2,'94');

/*Data for the table `preguntas` */

insert  into `preguntas`(`id`,`id_asignatura`,`id_plan`,`contenido`,`validada`) values (1,1,2,'Un mezclador doblemente balanceado anula:',1),(2,1,2,'Las pérdidas de conversión de un mezclador se calculan:',1),(3,1,2,'Si la señal moduladora a la entrada de un modulador no balanceado es una sinusoide de valor medio nulo, la señal modulada a su salida es:',1),(4,1,2,'Para que una señal modulada en AM por un tono no exista sobremodulación, es suficiente que la diferencia entre la raya central del espectro y las rayas laterales sea:',1),(5,1,2,'Si la sensibilidad de un analizador de espectros es de -30dBm, se pueden medir señales de entrada:',1),(6,1,2,'Si las frecuencias de símbolo de una modulación FSK son f1=10,75MHz, y f2=11,05MHz, la desviación de frecuencia de la señal FSK es de:',1),(7,1,2,'Se transmite una secuencia de bits 0001, de forma periódica, con una duración de 25micros, utilizando modulación BPSK. La separación entre deltas de la señal modulada es:',1),(8,1,2,'¿Cuál no es una ventaja de los receptores superheterodinos?:',1),(9,1,2,'Considere una señal QPSK de 10Mbps, y otra señal BPSK de 5Mbps:',1),(10,1,2,'La Mínima Señal Detectable (MSD) es:',1),(11,1,2,'En la respuesta transitoria de un PLL con un filtro de lazo lead-lag activo:',1),(12,1,2,'La potencia de ruido a la salida (en dBm) de un receptor de ganancia G es:',1),(13,1,2,'Un modulador de BLS basado en el modulador IQ tiene únicamente dos entradas: Una para la señal moduladora y otra para señal portadora. Indique cómo utilizarlo para modular en BLI:',1),(14,1,2,'El montaje de un PLL como demodulador de frecuencia nos permite medir:',1),(15,1,2,'En un receptor superheterodino como el del laboratorio, la función del filtro de FI entre el mezclador y el amplificador de FI es:',1),(16,1,2,'Suponga un modulador ideal utilizado para generar una señal AM. El índice de modulación se incrementa:',1);

/*Data for the table `respuestas` */

insert  into `respuestas`(`id`,`id_pregunta`,`contenido`,`correcta`) values (1,1,'El oscilador local (OL), sus armónicos y aquellas componentes con armónicos pares de FI y del OL',1),(2,1,'El oscilador local (OL), sus armónicos y aquellas componentes con armónicos pares de FI',0),(3,1,'El oscilador local (OL), sus armónicos y aquellas componentes con armónicos pares de FI e impares del OL',0),(4,2,'Restando a la potencia de RF en la salida del OL, la potencia de FI en la entrada de éste',1),(5,2,'Restando a la potencia de RF en la salida del OL, la potencia de RF en la entrada de éste',0),(6,2,'Restando a la potencia de RF en la salida del OL, la potencia de FI también a la salida de éste',0),(7,3,'AM',1),(8,3,'DBL',0),(9,3,'BLU',0),(10,4,'Superior a 4 dB',1),(11,4,'Proporcional al índice de modulación',0),(12,4,'Ninguna de las anteriores es correcta',0),(13,5,'De 25mVpp o mayores',1),(14,5,'De 5mVpp o mayores',0),(15,5,'De 10mVpp o mayores',0),(16,6,'150KHz',1),(17,6,'300KHz',0),(18,6,'75KHz',0),(19,7,'10KHz',1),(20,7,'20KHz',0),(21,7,'40KHz',0),(22,8,'Se evita tener que recuperar la portadora',1),(23,8,'Permite reducir el factor de calidad de los filtros manteniendo la selectividad',0),(24,8,'Se evitan problemas de inestabilidades al amplificar la señal a distintas frecuencias',0),(25,9,'La señal BPSK tiene la mitad de ancho de banda que la señal QPSK',0),(26,9,'La señal QPSK tiene igual eficiencia espectral que la señal BPSK',0),(27,9,'Las dos respuestas anteriores son falsas',1),(28,10,'El nivel de RF para el cuál la señal de FI tiene la misma potencia que el ruido en FI',1),(29,10,'El nivel de RF para el cuál la señal de FI tiene el doble de potencia que el ruido en FI',0),(30,10,'El nivel de RF para el cuál al demodular un pulso de RF los picos de ruido de los niveles alto y bajo de la señal se igualen',0),(31,11,'El error de posición es constante',1),(32,11,'El error de velocidad es nulo',0),(33,11,'El error de aceleración es nulo',0),(34,12,'No = MDS + G',1),(35,12,'No = MDS + G + F',0),(36,12,'No = 10log(KTo)+ 10log(Brx)+G',0),(37,13,'Desfasando 90º la señal moduladora',0),(38,13,'Desfasando 90º la señal portadora',0),(39,13,'Ninguna de las anteriores es correcta',1),(40,14,'La función de transferencia en lazo cerrado H(s)',0),(41,14,'El factor de amortiguamiento y la pulsación natural del PLL',0),(42,14,'Las dos respuestas anteriores son ciertas',1),(43,15,'Eliminar posibles productos de intermodulación no deseados',1),(44,15,'Aumentar el rechazo a la banda imagen',0),(45,15,'Las dos anteriores',0),(46,16,'Al disminuir el valor medio de a señal moduladora',1),(47,16,'Al disminuir la amplitud de la señal de oscilador local(portadora)',0),(48,16,'Las dos respuestas anteriores son correctas',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
