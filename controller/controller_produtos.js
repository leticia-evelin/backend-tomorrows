/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 26/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

 var produtosDAO = require('../model/DAO/produtosDAO.js');
 var message = require('./modulo/config.js');

 //função para receber os dados do app e enviar para o model para inserir novo item
 const inserirProdutos = async function(dadosProdutos){

    if(dadosProdutos.nome             == '' || dadosProdutos.nome          == undefined || dadosProdutos.nome.length > 100 ||
       dadosProdutos.descricao        == '' || dadosProdutos.descricao     == undefined ||
       dadosProdutos.preco            == '' || dadosProdutos.preco         == undefined || isNaN(dadosProdutos.preco) ||
       dadosProdutos.imagem           == '' || dadosProdutos.imagem        == undefined || dadosProdutos.imagem.length > 150 ||
       dadosProdutos.altura           == undefined || dadosProdutos.altura.length > 50 ||
       dadosProdutos.largura          == undefined || dadosProdutos.largura.length > 50 ||
       dadosProdutos.tamanho_sigla > 5 ||
       dadosProdutos.categoria        == '' || dadosProdutos.categoria == undefined || dadosProdutos.categoria > 80
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await produtosDAO.insertProdutos(dadosProdutos);

        if(status){
            let dadosJSON = {};

            let produtoNovoId = await produtosDAO.selectLastId();
            dadosProdutos.id = produtoNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.produto = dadosProdutos;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }
 };

 //função para selecionar todos os regitros
 const selecionarTodosProdutos = async function(){

    let dadosProdutos = await produtosDAO.selectAllProdutos();

    let dadosJSON = {};

    if(dadosProdutos){
        dadosJSON.status = 200;

        dadosJSON.count = dadosProdutos.length;

        dadosJSON.produtos = dadosProdutos;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

 
 //função para excluir um produto pelo id, irá para o model
 const deletarProduto = async function(idProduto){

    if(idProduto == '' || idProduto == undefined || isNaN(idProduto)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await produtosDAO.deleteProduto(idProduto);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };

 const atualizarProduto = async function(dadosProdutos, idProduto){

    if(dadosProdutos.nome             == '' || dadosProdutos.nome          == undefined || dadosProdutos.nome.length > 100 ||
       dadosProdutos.descricao        == '' || dadosProdutos.descricao     == undefined ||
       dadosProdutos.cor              == '' || dadosProdutos.cor           == undefined || dadosProdutos.cor.length > 100|| 
       dadosProdutos.preco            == '' || dadosProdutos.preco         == undefined || isNaN(dadosProdutos.preco) ||
       dadosProdutos.imagem           == '' || dadosProdutos.imagem        == undefined || dadosProdutos.imagem.length > 150 ||
       dadosProdutos.altura          == undefined || dadosProdutos.altura.length > 50 ||
       dadosProdutos.largura          == undefined || dadosProdutos.largura.length > 50 ||
       dadosProdutos.tamanho_sigla > 5 ||
       dadosProdutos.categoria        == '' || dadosProdutos.categoria == undefined || dadosProdutos.categoria > 80
    )
    {
        return message.ERROR_REQUIRED_DATA;

    } else if(idProduto == '' || idProduto == undefined || isNaN(idProduto)){
        return message.ERROR_REQUIRED_ID;
        
    } else {
        dadosProdutos.id = idProduto;

        let status = await produtosDAO.updateProduto(dadosProdutos);

        if(status){
            let dadosJSON = {};
            let produtoId = await produtosDAO.selectLastId();
            dadosProdutos.id = produtoId;

            dadosJSON.status = message.UPDATED_ITEM.status;
            dadosJSON.produto = dadosProdutos;
            return dadosJSON;
        } else 
            return message.ERROR_INTERNAL_SERVER;
    }
 }

 //função para buscar um item filtrando pelo id, será encaminhado para o model
const buscarIdProduto = async function(id){

    //Validação para o ID
    if(id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {     

      //Solicita ao DAO todos os patrocinadores do banco de dados
      let dadosProdutos = await produtosDAO.selectByIdProduto(id);

      //Cira um objeto do tipo JSON
      let dadosJSON = {};
  
      //Valida se o banco de dados teve registros, 
      //se sim adiciona o array de patrocinadores em um JSON para retornar ao app
      if(dadosProdutos){
          dadosJSON.status = 200;
          dadosJSON.produto = dadosProdutos;
          return dadosJSON;
     } else {
          return message.ERROR_NOT_FOUND;   
        }
    }  
};

 module.exports = {
    inserirProdutos,
    selecionarTodosProdutos,
    deletarProduto,
    atualizarProduto,
    buscarIdProduto
 }