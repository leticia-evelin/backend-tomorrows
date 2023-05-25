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

    //Retorna todos os dados do Doador
    app.get('/v1/tomorrows-water/doador', cors(), async function(request, response){

        //Solicita a controller e retorna todos os alunos do banco de dados
        let dados = await controllerDoador.selecionarTodosDoadores();

        //Valida se existem registros para retornar na requisição
        response.status(dados.status)
        response.json(dados)

    });

    //Inserir um novo Doador
    app.post('/v1/tomorrows-water/doador', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            // envia para a controller
            let resultInsertDados = await controllerDoador.inserirDoador(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    //Excluir um Doador pelo id
    app.delete('/v1/tomorrows-water/doador/:id', cors(), async function(request, response){

        let idDoador = request.params.id;

        let resultDeleteDados = await controllerDoador.deletarDoador(idDoador);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

    //Atualiza Doador pelo id
    app.put('/v1/tomorrows-water/doador/:id', cors(), bodyJSON, async function(request, response){

        let dadosBody = request.body;

        let idDoador = request.params.id;

        let resultUpdateDados = await controllerDoador.atualizarDoador(dadosBody, idDoador);

        response.status(resultUpdateDados.status);
        response.json(resultUpdateDados);

    });

    app.listen(8080, function(){
        console.log('Servidor aguardando requisições na porta 8080');
    });         