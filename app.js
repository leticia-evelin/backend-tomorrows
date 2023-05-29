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


    //Criando uma const para realizar o processo de padronização de dados 
    //que vão chegar no body da requisição
    const bodyJSON = bodyParser.json();


   var controllerDoador = require('./controller/controller_doador.js');
   var controllerProduto = require('./controller/controller_produtos.js');
   var controllerProjeto = require('./controller/controller_projetos.js');
   var controllerPatrocinador = require('./controller/controller_patrocinador.js');
   var controllerRecado = require('./controller/controller_recado.js');
   var message = require('./controller/modulo/config.js');

    /***************************************
    * EndPoint: Tabela dos doadores
    * Versão: 1.0
    * Data: 25/05/2023
    ***************************************/

    //Retorna todos os dados do Doador
    app.get('/v1/tomorrows-water/doador', cors(), async function(request, response){

        //Solicita a controller e retorna todos os alunos do banco de dados
        let dados = await controllerDoador.selecionarTodosDoadores();

        //Valida se existem registros para retornar na requisição
        response.status(dados.status)
        response.json(dados)

    });

    //EndPoint: Retorna dados do patrocinador pelo id
    app.get('/v1/tomorrows-water/doador/:id', cors(), async function(request, response){
        
        let idDoador = request.params.id

        let dados = await controllerDoador.buscarIdDoador(idDoador);

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


    /***************************************
    * EndPoint: Tabela dos produtos
    * Versão: 1.0
    * Data: 26/05/2023
    ***************************************/

    //Retorna todos os Produtos
    app.get('/v1/tomorrows-water/produto', cors(), async function(request, response){

    //Solicita a controller e retorna todos os alunos do banco de dados
    let dados = await controllerProduto.selecionarTodosProdutos();

    //Valida se existem registros para retornar na requisição
    response.status(dados.status)
    response.json(dados)

    });
    
     //EndPoint: Retorna dados do produto pelo id
    app.get('/v1/tomorrows-water/produto/:id', cors(), async function(request, response){
        
        let idProduto = request.params.id

        let dados = await controllerProduto.buscarIdProduto(idProduto);

        response.status(dados.status)
        response.json(dados)

    });
    
    //Inserir um novo Produto
    app.post('/v1/tomorrows-water/produto', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            dadosBody.id_ong = request.body.id_ong;

            // envia para a controller
            let resultInsertDados = await controllerProduto.inserirProdutos(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    
    //Excluir um Produto pelo id
    app.delete('/v1/tomorrows-water/produto/:id', cors(), async function(request, response){

        let idProduto = request.params.id;

        let resultDeleteDados = await controllerProduto.deletarProduto(idProduto);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

  //Atualiza Produto pelo id
  app.put('/v1/tomorrows-water/produto/:id', cors(), bodyJSON, async function(request, response){

    let dadosBody = request.body;

    let idProduto = request.params.id;

    let resultUpdateDados = await controllerProduto.atualizarProduto(dadosBody, idProduto);

    response.status(resultUpdateDados.status);
    response.json(resultUpdateDados);

});


    /***************************************
    * EndPoint: Tabela dos projetos
    * Versão: 1.0
    * Data: 27/05/2023
    ***************************************/    

    //Retorna todos os Projetos
    app.get('/v1/tomorrows-water/projeto', cors(), async function(request, response){

        //Solicita a controller e retorna todos os alunos do banco de dados
        let dados = await controllerProjeto.selecionarTodosProjetos();
    
        //Valida se existem registros para retornar na requisição
        response.status(dados.status)
        response.json(dados)
    
    });

    app.post('/v1/tomorrows-water/projeto', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            dadosBody.id_ong = request.body.id_ong;

            // envia para a controller
            let resultInsertDados = await controllerProjeto.inserirProjetos(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

        
    //Excluir um Projeto pelo id
    app.delete('/v1/tomorrows-water/projeto/:id', cors(), async function(request, response){

        let idProjeto = request.params.id;

        let resultDeleteDados = await controllerProjeto.deletarProjeto(idProjeto);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

    //Atualiza Projeto pelo id
    app.put('/v1/tomorrows-water/projeto/:id', cors(), bodyJSON, async function(request, response){

        let dadosBody = request.body;

        let idProjeto = request.params.id;

        let resultUpdateDados = await controllerProjeto.atualizarProjeto(dadosBody, idProjeto);

        response.status(resultUpdateDados.status);
        response.json(resultUpdateDados);

    });

    /***************************************
    * EndPoint: Tabela de patrocinadores
    * Versão: 1.0
    * Data: 29/05/2023
    ***************************************/  

    //Retorna todos os Patrocinadores
    app.get('/v1/tomorrows-water/patrocinador', cors(), async function(request, response){

        //Solicita a controller e retorna todos os alunos do banco de dados
        let dados = await controllerPatrocinador.selecionarTodosPatrocinadores();
    
        //Valida se existem registros para retornar na requisição
        response.status(dados.status)
        response.json(dados)
    
    });

    //EndPoint: Retorna dados do patrocinador pelo id
    app.get('/v1/tomorrows-water/patrocinador/:id', cors(), async function(request, response){
        
        let idPatrocinador = request.params.id

        let dados = await controllerPatrocinador.buscarIdPatrocinador(idPatrocinador);

        response.status(dados.status)
        response.json(dados)

    });

    app.post('/v1/tomorrows-water/patrocinador', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            dadosBody.id_ong = request.body.id_ong;

            // envia para a controller
            let resultInsertDados = await controllerPatrocinador.inserirPatrocinador(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    //Excluir um Patrocinador pelo id
     app.delete('/v1/tomorrows-water/patrocinador/:id', cors(), async function(request, response){

        let idPatrocinador = request.params.id;

        let resultDeleteDados = await controllerPatrocinador.deletarPatrocinador(idPatrocinador);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });


    // Atualiza Patrocinador pelo id
    app.put('/v1/tomorrows-water/patrocinador/:id', cors(), bodyJSON, async function(request, response){

        let dadosBody = request.body;

        let idPatrocinador = request.params.id;

        let resultUpdateDados = await controllerPatrocinador.atualizarPatrocinador(dadosBody, idPatrocinador);

        response.status(resultUpdateDados.status);
        response.json(resultUpdateDados);

    });

    /***************************************
    * EndPoint: Tabela de Recados
    * Versão: 1.0
    * Data: 29/05/2023
    ***************************************/   
    
    app.get('/v1/tomorrows-water/recado', cors(), async function(request, response){

        let dados = await controllerRecado.selecionarTodosRecados();
    
        response.status(dados.status)
        response.json(dados)
      
    });



    /***************************************
    * EndPoint: Tabela de login (dashboard)
    * Versão: 1.0
    * Data: 29/05/2023
    ***************************************/   
    


    




    app.listen(8080, function(){
        console.log('Servidor aguardando requisições na porta 8080');
    });         