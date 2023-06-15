/***************************************************************
 * Objetivo: Script para criação do banco de dados 
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

 create database db_tomorrows_water_2023;
 
use db_tomorrows_water_2023;

##TABELA ONG
create table tbl_ong(
			 id int not null auto_increment primary key,
			 nome varchar(80) not null,
			 descricao text not null,
			 email varchar(255) not null,
			 area_atuacao varchar(150) not null,
			 data_fundacao date not null,
			 telefone varchar(20) not null
);

insert into tbl_ong(
			nome, 
            descricao, 
            email, 
            area_atuacao, 
            data_fundacao,
            telefone
            ) values (
            'Tomorrows Water', 
            'Fortalecer as propostas da ODS 6, baseado no bem-estar da população, com acesso à saúde por meio da água e saneamento básico.',
			'tomorrowswater@gmail.com',
             'Saneamento e água potável',
             '1987-07-01', '(11)98547-2354'
             );

##TABELA RECADO 
create table tbl_recado(
			 id int not null auto_increment primary key,
             nome varchar(50) not null,
             email varchar(255) not null,
             mensagem text not null
);


##TABELA DE GENERO
 create table tbl_genero(
			 id int not null auto_increment primary key,
			 nome varchar(45) not null,
			 sigla varchar(5) not null
);

insert into tbl_genero(nome, sigla) values ('Feminino', 'F'), ('Masculino', 'M'), ('Outros', 'O');

##TABELA PRODUTOS 
create table tbl_produtos(
			 id int not null auto_increment primary key,
             nome varchar(100) not null,
             descricao text not null,
             cor varchar(100) not null,
             preco float not null,
             imagem varchar(150) not null,
             altura varchar(50),
             largura varchar(50),
             tamanho_sigla varchar(5),
             categoria varchar(80) not null
); 

insert into tbl_produtos(
						nome, 
                        descricao, 
                        cor, 
                        preco, 
                        imagem, 
                        altura, 
                        largura, 
                        tamanho_sigla,
                        categoria
                        ) values (
                        'Camiseta TW', 
                        'Camiseta de algodão Tomorrows Water',
                        'Branco',
                        '112.50',
                        'https://i.im.ge/2023/06/03/h3Pvg1.camiseta-tw.png',
                        null,
                        null,
                        'M',
                        'Roupa'
                        );

insert into tbl_produtos(
			nome, 
            descricao, 
            cor, preco, 
            imagem, altura, 
            largura,  
            tamanho_sigla, 
            categoria
            ) values (
               'Ecobag sustentável',
               'Ecobag da ONG. Nossa ideia é que nossos clientes deixem de usar sacolas plásticas que poluem nosso planeta e troque por sacolas reutilizáveis em algodão cru. Melhorando assim a condição do meio ambiente e a sustentabilidade.',
               'Bege', '47',
               'https://i.im.ge/2023/06/03/h3Pp0P.ecobag-water.png','40cm', 
               '25mm',
               null, 
               'Produtos sustentáveis'
				),
                
                 ('Ecobag sustentável',
                'Ecobag com logo da ONG. Nossa ideia é que nossos clientes deixem de usar sacolas plásticas que poluem nosso planeta e troque por sacolas reutilizáveis em algodão cru. Melhorando assim a condição do meio ambiente e a sustentabilidade.',
                'Bege', '47',
                'https://i.im.ge/2023/06/03/h3PkVq.ecobag-logo.png', '40cm',
                '25mm', 
                null, 
                'Produtos sustentáveis'
                ),
                
				('Ecobag sustentável',
				'Ecobag da ONG. Nossa ideia é que nossos clientes deixem de usar sacolas plásticas que poluem nosso planeta e troque por sacolas reutilizáveis em algodão cru. Melhorando assim a condição do meio ambiente e a sustentabilidade.',
                'Bege', '47',
                'https://i.im.ge/2023/06/03/h3PHlp.ecobag-tw.png', '40cm',
                '25mm', 
                null, 
                'Produtos sustentáveis'
                ),
                
                ('Garrafa Térmica Bambu TW',
                'Garrafa Térmica com revestimento em bambu e aço inox, com parede dupla e infusor para chá. além da abundância e da beleza, o bambu ainda apresenta propriedades antibacterianas, é muito resistente, é leve, é versátil, é renovável e tem uma longa vida. Ecologicamente, o bambu cumpre um papel importantíssimo na proteção de nascentes e na preservação do solo firme.',
                'Marrom', '99',
                'https://i.im.ge/2023/05/24/hqDWCP.garrafa-logo.png', '20.4cm',
                '6,9cm', 
                null, 
                'Produtos para bebidas'
                ),
           
                ('Garrafa Térmica Bambu',
                'Garrafa Térmica com revestimento em bambu e aço inox, com parede dupla e infusor para chá. além da abundância e da beleza, o bambu ainda apresenta propriedades antibacterianas, é muito resistente, é leve, é versátil, é renovável e tem uma longa vida. Ecologicamente, o bambu cumpre um papel importantíssimo na proteção de nascentes e na preservação do solo firme.',
                'Marrom', '99',
                'https://i.im.ge/2023/05/24/hqDkVr.garrafa-tw.png', '20.4cm',
                '6.9cm', 
                null, 
                'Produtos para as bebidas'
                ),
                ('Botton TW',
                'Nossos bottons são feitos com o melhor material, desde o papel até o laminação do botton, tudo feito com muito carinho e cuidado para você! Para colocar na sua roupa, mochila, boné, etc...',
                'Branco', '5',
                'https://i.im.ge/2023/05/24/hqDf6m.botton-logo.png', '3.80cm',
                '0.10cm', 
                null, 
                'Acessórios'
                ), 
                ('Botton Tomorrow',
                'Nossos bottons são feitos com o melhor material, desde o papel até o laminação do botton, tudo feito com muito carinho e cuidado para você! Para colocar na sua roupa, mochila, boné, etc...',
                'Branco', '5',
                'https://i.im.ge/2023/05/24/hdWe8m.botton-tw.png', '3.80cm',
                '0.10cm', 
                null, 
                'Acessórios'
                );

##TABELA PROJETOS
create table tbl_projetos(
			 id int not null auto_increment primary key,
			 nome varchar(150) not null,
			 descricao text not null,
			 imagem varchar(170)
);

insert into tbl_projetos(
			nome, descricao, imagem
            ) values ( 
            'Bem estar',
            'Buscamos trazer um local para viver digno a todos os cidadões, sem a presença de esgotos a céu aberto e outros problemas devidos a falta de saneamento básico, para sanarmos com isso vamos realizar obras de melhoria em lugares precários e esquecidos na região do Macapá. O saneamento básico desempenha um papel crucial na promoção do bem-estar e na garantia de uma vida saudável para todos. Infelizmente, em muitas regiões, a falta de infraestrutura adequada tem impactos significativos na qualidade de vida das pessoas. Esgotos a céu aberto representam um grave risco à saúde, contribuindo para a propagação de doenças e afetando a dignidade e o conforto dos indivíduos. Nesse sentido, estamos comprometidos em implementar obras de melhoria que visam solucionar essas questões. Compreendemos que é necessário direcionar esforços para as áreas mais vulneráveis e negligenciadas, onde os problemas relacionados ao saneamento básico são mais prementes. Acreditamos que todos os cidadãos merecem viver em um ambiente limpo, seguro e saudável. Com a conclusão dessas obras, proporcionaremos às comunidades uma infraestrutura sólida que lhes permitirá desfrutar de um ambiente propício ao desenvolvimento físico, mental e social. O acesso a água limpa e saneamento adequado não apenas previne doenças, mas também promove a dignidade humana, a inclusão social e a melhoria da qualidade de vida. Esses projetos contribuem para a transformação de áreas negligenciadas em espaços vibrantes e prósperos.',
            'https://portal.fgv.br/sites/portal.fgv.br/files/styles/noticia_geral/public/noticias/08/21/saneamento_0.jpg?itok=n-MRNY0G'),
            (
            'Saúde',
            'Nosso principal projeto envolvido na área da saúde é levar água potável para as pessoas com maior carência no acesso a este bem tão precioso. A água é essencial para a sobrevivência e bem-estar humano, e é preocupante constatar que muitas comunidades ainda sofrem com a falta de acesso a água potável. Em particular, temos concentrado nossos esforços no município de Macapá, onde a situação é alarmante. Macapá, a capital do estado do Amapá, enfrenta desafios significativos em relação ao abastecimento de água. Infelizmente, muitos moradores não têm acesso a fontes seguras de água potável, o que pode levar a problemas graves de saúde.Para lidar com essa questão, nossa ONG tem mobilizado voluntários para distribuir garrafinhas de água nas áreas mais afetadas. Reconhecemos que a falta de acesso à água potável é uma questão urgente e, por meio dessa iniciativa, buscamos fornecer alívio imediato às comunidades afetadas. Buscamos colaborar com autoridades locais, organizações governamentais e outras ONGs para encontrar soluções sustentáveis ​​e de longo prazo para garantir o acesso universal à água potável em Macapá.Nossa luta pela saúde continua, e estamos determinados a alcançar resultados tangíveis. Acreditamos que, através da solidariedade, esforço coletivo e conscientização, podemos fazer a diferença na vida das pessoas afetadas pela falta de acesso à água potável. A saúde é um direito fundamental, e continuaremos nossa missão de levar saúde e bem-estar para aqueles que mais precisam.',
            'https://sisejufe.org.br/wp-content/uploads/2020/04/WhatsApp-Image-2020-04-28-at-15.15.39.jpeg'), 
            (
            'Higiene',
            'Nesta área, buscamos zelar pela higiene digna de todas as pessoas, independentemente das condições em que vivem e do local em que residem. Reconhecendo que a higiene é um direito básico e essencial para a saúde e o bem-estar de cada indivíduo, nossa iniciativa consiste em levar postos de higienização pessoal a diferentes comunidades por meio de barcos equipados com banheiros. A acessibilidade à higiene adequada é um desafio enfrentado por muitas pessoas em todo o mundo, especialmente aquelas que vivem em áreas remotas, carentes de infraestrutura básica. Ao trazer esses barcos com banheiros, pretendemos eliminar as barreiras que dificultam o acesso à higiene e garantir que ela se torne parte integrante da rotina diária de cada indivíduo. A abordagem inovadora de utilizar barcos como postos de higienização pessoal tem como objetivo atingir comunidades que estão situadas em regiões de difícil acesso, como áreas ribeirinhas ou ilhas remotas. Essas regiões muitas vezes carecem de serviços essenciais, como água potável, instalações sanitárias adequadas e acesso a produtos de higiene. Com a presença desses barcos, levamos a higiene diretamente às comunidades, reduzindo a distância física e tornando-a mais acessível.Acreditamos firmemente que a higiene não deve ser um privilégio, mas sim um direito de todos. Ao levar postos de higienização pessoal por meio de barcos, estamos rompendo as barreiras que impedem o acesso universal à higiene, permitindo que pessoas em todas as condições de vida tenham a oportunidade de desfrutar de uma higiene digna e saudável.',
            'https://tribunademinas.com.br/wp-content/uploads/2020/04/trailer-solid%C3%A1rio-divulga%C3%A7%C3%A3o-sociedade-s%C3%A3o-vicente-de-paulo.jpg');


##TABELA DOACAO
create table tbl_doacao(
			 id int not null auto_increment primary key,
             tipo_doacao varchar(45),
             valor float not null,
			#chave estrangeira do doador
			 id_doador int not null,
                        
			 constraint FK_Doacao_Doador
			 foreign key (id_doador)
			 references tbl_doador (id),
                        
			unique index(id)
);

             
##TABELA DOADOR 
 create table tbl_doador(
			 id int not null auto_increment primary key,
			 nome varchar(50) not null,
			 email varchar(255) not null,
			 cpf varchar(45) not null,
			 data_nascimento date not null,
			 telefone varchar(20) not null
);

##TABELA VOLUNTÁRIOS 
create table tbl_voluntarios(
			 id int not null auto_increment primary key,
			 nome varchar(50) not null,
			 email varchar(255) not null,
			 data_nascimento date not null,
			 cpf varchar(45) not null,
             telefone varchar(20) not null,
			 #chave estrangeira de genero
			 id_genero int not null,
                        
			constraint FK_Genero_Voluntarios
			foreign key (id_genero)
			references tbl_genero (id),
            
                        
			unique index(id)
);

##TABELA PATROCINADOR  
create table tbl_patrocinador(

			 id int not null auto_increment primary key,
             razao_social varchar(80) not null,
             cnpj varchar(45) not null,
             email varchar(255) not null,
             telefone varchar(20) not null
);


##TABELA DASHBOARD 
create table tbl_administrador(
			 id int not null auto_increment primary key,
             nome varchar(50) not null,
             email varchar(255) not null,
             senha varchar(50) not null
);

insert into tbl_administrador(nome, email, senha) values ('Ong Tomorrows Water', 'tomorrows.water487@gmail.com', '256020mA')