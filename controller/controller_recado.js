/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 29/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/


var recadoDAO = require('../model/DAO/recadoDAO.js');
var message = require('./modulo/config.js');


 //função para selecionar todos os regitros
 const selecionarTodosRecados = async function(){

    let dadosRecado = await recadoDAO.selectAllRecados();

    let dadosJSON = {};

    if(dadosRecado){
        dadosJSON.status = 200;

        dadosJSON.count = dadosRecado.length;

        dadosJSON.recado = dadosRecado;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };


 module.exports = {
    selecionarTodosRecados
 }