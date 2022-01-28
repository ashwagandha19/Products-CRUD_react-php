-- scriptul de sql cu datele de test pt phpmyadmin

CREATE TABLE `products_db`.`products` ( `id` INT NOT NULL AUTO_INCREMENT , `nume` VARCHAR(30) NOT NULL , `pret` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO `products` (`id`, `nume`, `pret`) VALUES ('1', 'produs1', '10');
INSERT INTO `products` (`id`, `nume`, `pret`) VALUES ('2', 'produs2', '20');
INSERT INTO `products` (`id`, `nume`, `pret`) VALUES ('3', 'produs3', '30');
INSERT INTO `products` (`id`, `nume`, `pret`) VALUES ('4', 'produs3', '40');
INSERT INTO `products` (`id`, `nume`, `pret`) VALUES ('5', 'produs3', '50');