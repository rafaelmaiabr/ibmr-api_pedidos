CREATE TABLE IF NOT EXISTS `ibmr_api`.`clientes` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `telefone` VARCHAR(15) NULL,
  `endereco` VARCHAR(300) NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `ibmr_api`.`produtos` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `nome_produto` VARCHAR(100) NULL,
  `preco` DECIMAL(10,2) NULL,
  `estoque` INT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS `ibmr_api`.`pedidos` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_produto` INT NOT NULL,
  `data_pedido` DATE NULL,
  `quantidade` INT NULL,
  `valor_total` VARCHAR(45) NULL,
  `pedidoscol` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id_pedido`, `id_cliente`, `id_produto`),
  INDEX `fk_pedidos_clientes_idx` (`id_cliente` ASC),
  INDEX `fk_pedidos_produtos1_idx` (`id_produto` ASC),
  CONSTRAINT `fk_pedidos_clientes`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `ibmr_api`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `ibmr_api`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB