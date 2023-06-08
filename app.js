/*************************************************************************************
 * Objetivo: API para interagir com o banco de dados do nosso sistema Tomorrow's Water
 * Data: 25/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 ************************************************************************************/


// npm install express --save   npm install cors --save   npm install body-parser --save


//npm install jsonwebtoken = dependencia do JWT

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

    const port = process.env.PORT || 8080;

    //Criando uma const para realizar o processo de padronização de dados 
    //que vão chegar no body da requisição
    const bodyJSON = bodyParser.json();


   var controllerDoador = require('./controller/controller_doador.js');
   var controllerProduto = require('./controller/controller_produtos.js');
   var controllerProjeto = require('./controller/controller_projetos.js');
   var controllerPatrocinador = require('./controller/controller_patrocinador.js');
   var controllerRecado = require('./controller/controller_recado.js');
   var controllerAdministrador = require('./controller/controller_administrador.js');
   var controllerVoluntario = require('./controller/controller_voluntario.js');
   var controllerDoacao = require('./controller/controller_doacao.js');
   var controllerTelefone = require('./controller/controller_telefone.js');
   var admDAO = require('./model/DAO/administradorDAO.js');
   var message = require('./controller/modulo/config.js');

    /***************************************
    * EndPoint: Tabela dos doadores
    * Versão: 1.0
    * Data: 25/05/2023
    ***************************************/

    //EndPoint: Retorna todos os dados do Doador
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
    
    //EndPoint: Inserir um novo Doador
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

    //EndPoint: Excluir um Doador pelo id
    app.delete('/v1/tomorrows-water/doador/:id', cors(), async function(request, response){

        let idDoador = request.params.id;

        let resultDeleteDados = await controllerDoador.deletarDoador(idDoador);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

    //EndPoint: Atualiza Doador pelo id
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

    //EndPoint: Retorna todos os Produtos
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
    
    //EndPoint: Inserir um novo Produto
    app.post('/v1/tomorrows-water/produto', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;
    
          
            // envia para a controller
            let resultInsertDados = await controllerProduto.inserirProdutos(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    
    //EndPoint: Excluir um Produto pelo id
    app.delete('/v1/tomorrows-water/produto/:id', cors(), async function(request, response){

        let idProduto = request.params.id;

        let resultDeleteDados = await controllerProduto.deletarProduto(idProduto);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

   //EndPoint: Atualiza Produto pelo id
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

    //EndPoint: Retorna todos os Projetos
    app.get('/v1/tomorrows-water/projeto', cors(), async function(request, response){

        //Solicita a controller e retorna todos os alunos do banco de dados
        let dados = await controllerProjeto.selecionarTodosProjetos();
    
        //Valida se existem registros para retornar na requisição
        response.status(dados.status)
        response.json(dados)
    
    });

    //EndPoint: Inserir um novo projeto
    app.post('/v1/tomorrows-water/projeto', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            // envia para a controller
            let resultInsertDados = await controllerProjeto.inserirProjetos(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });
 
    //EndPoint: Excluir um Projeto pelo id
    app.delete('/v1/tomorrows-water/projeto/:id', cors(), async function(request, response){

        let idProjeto = request.params.id;

        let resultDeleteDados = await controllerProjeto.deletarProjeto(idProjeto);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

    //EndPoint: Atualiza Projeto pelo id
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

    //EndPoint: Retorna todos os Patrocinadores
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

    //EndPoint: Inserir um novo patrocinador
    app.post('/v1/tomorrows-water/patrocinador', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            // envia para a controller
            let resultInsertDados = await controllerPatrocinador.inserirPatrocinador(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    //EndPoint: Excluir um Patrocinador pelo id
     app.delete('/v1/tomorrows-water/patrocinador/:id', cors(), async function(request, response){

        let idPatrocinador = request.params.id;

        let resultDeleteDados = await controllerPatrocinador.deletarPatrocinador(idPatrocinador);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });


    // EndPoint: Atualiza Patrocinador pelo id
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
    
    //EndPoint: Retornar todos os registros
    app.get('/v1/tomorrows-water/recado', cors(), async function(request, response){

        let dados = await controllerRecado.selecionarTodosRecados();
    
        response.status(dados.status)
        response.json(dados)
      
    });

    //EndPoint: Excluir um Recado pelo id
    app.delete('/v1/tomorrows-water/recado/:id', cors(), async function(request, response){

        let idRecado = request.params.id;

        let resultDeleteDados = await controllerRecado.deletarRecado(idRecado);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

    //EndPoint: Inserir um novo recado
    app.post('/v1/tomorrows-water/recado', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            // envia para a controller
            let resultInsertDados = await controllerRecado.inserirRecado(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });



    /***************************************
    * EndPoint: Tabela de administrador (dashboard)
    * Versão: 1.0
    * Data: 01/06/2023
    ***************************************/   
    //Receber o token encaminhado nas requisições e solicitar a validação
    const verifyJWT = async function(request, response, next){

        //Recebe o token encaminhado no header da requisição
        let token = request.headers['x-acess-token'];

        const jwt = require('../middleware/middlewareJWT.js');

        //Valida a autenticidade do token
        const autenticidadeToken = await jwt.validateJWT(token);

        //Verifica se a requisição poderá continuar ou não
        if(autenticidadeToken)
            next();
        else   
        response.status(401).end();  
    };


    //EndPoint: Retorna todos os dados do Administrador
    app.get('/v1/tomorrows-water/administrador', cors(), async function(request, response){

        let dados = await controllerAdministrador.selecionarTodosAdministradores();
    
        response.status(dados.status)
        response.json(dados)
      
    });

    //EndPoint: Inserir um novo administrador
    app.post('/v1/tomorrows-water/administrador', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            // envia para a controller
            let resultInsertDados = await controllerAdministrador.inserirAdministrador(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    //EndPoint: Excluir um Administrador pelo id
     app.delete('/v1/tomorrows-water/administrador/:id', cors(), async function(request, response){

        let idAdm = request.params.id;

        let resultDeleteDados = await controllerAdministrador.deletarAdministrador(idAdm);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });

    // EndPoint: Atualiza Administrador pelo id
    app.put('/v1/tomorrows-water/administrador/:id', cors(), bodyJSON, async function(request, response){

        let dadosBody = request.body;

        let idAdm = request.params.id;

        let resultUpdateDados = await controllerAdministrador.atualizarAdministrador(dadosBody, idAdm);

        response.status(resultUpdateDados.status);
        response.json(resultUpdateDados);

    });

    //EndPoint: Retorna dados do administrador pelo id
    app.get('/v1/tomorrows-water/administrador/:id', cors(), async function(request, response){
        
        let idAdm = request.params.id

        let dados = await controllerAdministrador.buscarIdAdministrador(idAdm);

        response.status(dados.status)
        response.json(dados)

    });

    //EndPoint: Validação do login do Adm
    app.post('/v1/tomorrows-water/administrador/login', cors(), bodyJSON, async function(request, response) {
        const { email, senha } = request.body;
      
        // Chame a função validarAdministrador para validar o email e a senha
        const AdmValido = await admDAO.validarAdministrador(email, senha);
      
        if (AdmValido) {
          response.json({ message: 'Acesso autorizado, administrador válido!' });
        } else {
          response.status(401).json({ message: 'Acesso negado, administrador inválido!'});
        }
      });

    /***************************************
    * EndPoint: Tabela dos voluntários
    * Versão: 1.0
    * Data: 02/06/2023
    ***************************************/
    
     //EndPoint: Retorna todos os dados do voluntario
    app.get('/v1/tomorrows-water/voluntario', cors(), async function(request, response){

        let dados = await controllerVoluntario.selecionarTodosVoluntarios();
    
        response.status(dados.status)
        response.json(dados)
      
    });

     //EndPoint: Inserir um novo voluntario
    app.post('/v1/tomorrows-water/voluntario', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            dadosBody.id_genero = request.body.id_genero;

            // envia para a controller
            let resultInsertDados = await controllerVoluntario.inserirVoluntario(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }
    });

    //EndPoint: Excluir um Voluntario pelo id
    app.delete('/v1/tomorrows-water/voluntario/:id', cors(), async function(request, response){

        let idVoluntario = request.params.id;

        let resultDeleteDados = await controllerVoluntario.deletarVoluntario(idVoluntario);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });


    /***************************************
    * EndPoint: Tabela das Doações
    * Versão: 1.0
    * Data: 02/06/2023
    ***************************************/
    
     //EndPoint: Retorna todos os dados da doacao
     app.get('/v1/tomorrows-water/doacao', cors(), async function(request, response){

        let dados = await controllerDoacao.selecionarTodasDoacoes();
    
        response.status(dados.status)
        response.json(dados)
      
    });

     //EndPoint: Inserir uma nova doacao
    app.post('/v1/tomorrows-water/doacao', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            dadosBody.id_doador = request.body.id_doador;

            // envia para a controller
            let resultInsertDados = await controllerDoacao.inserirDoacao(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    //EndPoint: Excluir uma Doacao pelo id
    app.delete('/v1/tomorrows-water/doacao/:id', cors(), async function(request, response){

        let idDoacao = request.params.id;

        let resultDeleteDados = await controllerDoacao.deletarDoacao(idDoacao);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });


    
    /***************************************
    * EndPoint: Tabela dos Telefones
    * Versão: 1.0
    * Data: 03/06/2023
    ***************************************/

    //EndPoint: Retorna todos os dados do Telefone
    app.get('/v1/tomorrows-water/telefone', cors(), async function(request, response){

        let dados = await controllerTelefone.selecionarTodosNumeros();
    
        response.status(dados.status)
        response.json(dados)
      
    });

    //EndPoint: Inserir um novo Telefone
    app.post('/v1/tomorrows-water/telefone', cors(), bodyJSON, async function(request, response){

        //chega em formato de array
        let contentType = request.headers['content-type'];

        if(String(contentType).toLocaleLowerCase() == 'application/json'){

            //recebe os dados encaminhados no body da requisição
            let dadosBody = request.body;

            // envia para a controller
            let resultInsertDados = await controllerTelefone.inserirTelefone(dadosBody);

            response.status(resultInsertDados.status);
            response.json(resultInsertDados);

        } else {
            response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
            response.json(message.ERROR_INVALID_CONTENT_TYPE);
        }

    });

    //EndPoint: Excluir um Telefone pelo id
    app.delete('/v1/tomorrows-water/telefone/:id', cors(), async function(request, response){

        let idTelefone = request.params.id;

        let resultDeleteDados = await controllerTelefone.deletarTelefone(idTelefone);

        response.status(resultDeleteDados.status);
        response.json(resultDeleteDados);

    });


    app.listen(8080, function(){
        console.log('Servidor aguardando requisições na porta 8080');
    });         