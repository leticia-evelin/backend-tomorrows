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

 const deletarRecado = async function(idRecado){

    if(idRecado == '' || idRecado == undefined || isNaN(idRecado)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await recadoDAO.deleteRecado(idRecado);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };

 const inserirRecado = async function(dadosRecado){
    if(dadosRecado.nome == '' || dadosRecado.nome == undefined || dadosRecado.nome.length > 50 ||
       dadosRecado.email == '' || dadosRecado.email == undefined || dadosRecado.email.length > 255 ||
       dadosRecado.mensagem == '' || dadosRecado.mensagem == undefined
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await recadoDAO.insertRecado(dadosRecado);

        if(status){
            let dadosJSON = {};

            let recadoNovoId = await recadoDAO.selectLastId();
            dadosRecado.id = recadoNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.recado = dadosRecado;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }

};

 

 module.exports = {
    selecionarTodosRecados,
    deletarRecado,
    inserirRecado
 }