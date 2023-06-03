/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 02/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

var doacaoDAO = require('../model/DAO/doacaoDAO.js');
var message = require('./modulo/config.js');

const inserirDoacao = async function(dadosDoacao){
    if(dadosDoacao.tipo_doacao         == '' || dadosDoacao.tipo_doacao  == undefined || dadosDoacao.tipo_doacao.length > 45 ||
       dadosDoacao.valor           == '' || dadosDoacao.valor == undefined || isNaN(dadosDoacao.valor) ||
       dadosDoacao.id_doador == '' || dadosDoacao.id_doador == undefined || isNaN(dadosDoacao.id_doador)
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await doacaoDAO.insertDoacao(dadosDoacao);

        if(status){
            let dadosJSON = {};

            let doacaoNovoId = await doacaoDAO.selectLastId();
            dadosDoacao.id = doacaoNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.doacao = dadosDoacao;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }

};

const selecionarTodasDoacoes = async function(){

    let dadosDoacao = await doacaoDAO.selectAllDoacoes();

    let dadosJSON = {};

    if(dadosDoacao){
        dadosJSON.status = 200;

        dadosJSON.count = dadosDoacao.length;

        dadosJSON.doacoes = dadosDoacao;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

  //função para excluir um produto pelo id, irá para o model
  const deletarDoacao = async function(idDoacao){

    if(idDoacao == '' || idDoacao == undefined || isNaN(idDoacao)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await doacaoDAO.deleteDoacao(idDoacao);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };


 module.exports = {
    inserirDoacao,
    selecionarTodasDoacoes,
    deletarDoacao
 }