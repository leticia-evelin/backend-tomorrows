/*************************************************************************************
 * Objetivo: API para interagir com o banco de dados do nosso sistema Tomorrow's Water
 * Data: 25/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 ************************************************************************************/


// npm install express --save   npm install cors --save   npm install body-parser --save

// *  Para realizar a conexão com o banco de dados iremos utilizar o PRISMA
// *      npm install prisma --save
// *      npx prisma
// *      npx prisma init
// *      npm install @prisma/client
// */


//Import das bibliotecas
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    app.use(cors());

    next();

});

    /***************************************
     * EndPoint: Tabela do doador
     * Versão: 1.0
     * Data: 25/05/2023
     ***************************************/

  //Criando uma const para realizar o processo de padronização de dados 
    //que vão chegar no body da requisição
    const bodyJSON = bodyParser.json();


   var controllerDoador = require('./controller/controller_doador.js');
   var message = require('./controller/modulo/config.js');

    //Retorna todos os dados do doador
    app.get('/v1/tomorrows-water/doador', cors(), async function(request, response){

        //Solicita a controller e retorna todos os alunos do banco de dados
        let dados = await controllerDoador.selecionarTodosDoadores();

        //Valida se existem registros para retornar na requisição
        response.status(dados.status)
        response.json(dados)

    });


    app.listen(8080, function(){
        console.log('Servidor aguardando requisições na porta 8080');
    });         