-- CreateTable
-- CREATE TABLE `tbl_teste_prisma` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `nome` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `tbl_ong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `descricao` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `area_atuacao` varchar(150) NOT NULL,
  `data_fundacao` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tbl_doador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cpf` varchar(45) NOT NULL,
  `data_nascimento` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tbl_projetos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `imagem` varchar(150) DEFAULT NULL,
  `id_ong` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Ong_Projetos` (`id_ong`),
  CONSTRAINT `FK_Ong_Projetos` FOREIGN KEY (`id_ong`) REFERENCES `tbl_ong` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tbl_produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `cor` varchar(100) NOT NULL,
  `preco` float NOT NULL,
  `imagem` varchar(150) NOT NULL,
  `altura` varchar(50) DEFAULT NULL,
  `largura` varchar(50) DEFAULT NULL,
  `comprimento` varchar(50) DEFAULT NULL,
  `tamanho_sigla` varchar(5) DEFAULT NULL,
  `peso` varchar(50) NOT NULL,
  `categoria` varchar(80) NOT NULL,
  `id_ong` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Ong_Produtos` (`id_ong`),
  CONSTRAINT `FK_Ong_Produtos` FOREIGN KEY (`id_ong`) REFERENCES `tbl_ong` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;