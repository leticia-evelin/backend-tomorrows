/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 27/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

var projetosDAO = require('../model/DAO/projetosDAO.js');
var message = require('./modulo/config.js');

 //função para selecionar todos os regitros
 const selecionarTodosProjetos = async function(){

    let dadosProjetos = await projetosDAO.selectAllProjetos();

    let dadosJSON = {};

    if(dadosProjetos){
        dadosJSON.status = 200;

        dadosJSON.count = dadosProjetos.length;

        dadosJSON.projetos = dadosProjetos;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

  //função para receber os dados do app e enviar para o model para inserir novo item
  const inserirProjetos = async function(dadosProjetos){

    if(dadosProjetos.nome             == '' || dadosProjetos.nome          == undefined || dadosProjetos.nome.length > 150 ||
       dadosProjetos.descricao        == '' || dadosProjetos.descricao     == undefined ||
       dadosProjetos.imagem        == undefined || dadosProjetos.imagem.length > 150 ||
       dadosProjetos.id_ong           == '' || dadosProjetos.id_ong    == null || isNaN(dadosProjetos.id_ong)
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await projetosDAO.insertProjetos(dadosProjetos);

        if(status){
            let dadosJSON = {};

            let projetoNovoId = await projetosDAO.selectLastId();
            dadosProjetos.id = projetoNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.projetos = dadosProjetos;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }
 };


 module.exports = {
    selecionarTodosProjetos,
    inserirProjetos
 }