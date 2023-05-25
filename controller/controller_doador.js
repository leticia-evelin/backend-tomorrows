/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 25/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/


 var doadorDAO = require('../model/DAO/doadorDAO.js');
 var message = require('./modulo/config.js');



 //função para retornar todos os itens da tabela recebidos do model
 const selecionarTodosDoadores = async function(){

    let dadosDoador = await doadorDAO.selectAllDoador();

    let dadosJSON = {};

    if(dadosDoador){
        dadosJSON.status = 200;

        dadosJSON.count = dadosDoador.length;

        dadosJSON.doadores = dadosDoador;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

 module.exports = {
     selecionarTodosDoadores
 }