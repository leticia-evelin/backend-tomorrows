/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 03/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

var telefoneDAO = require('../model/DAO/telefoneDAO.js');
var message = require('./modulo/config.js');


 //função para selecionar todos os regitros
 const selecionarTodosNumeros = async function(){

    let dadosTelefone = await telefoneDAO.selectAllTelefones();

    let dadosJSON = {};

    if(dadosTelefone){
        dadosJSON.status = 200;

        dadosJSON.count = dadosTelefone.length;

        dadosJSON.telefone = dadosTelefone;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

const deletarTelefone = async function(idTelefone){

    if(idTelefone == '' || idTelefone == undefined || isNaN(idTelefone)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await telefoneDAO.deleteTelefone(idTelefone);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };

const inserirTelefone = async function(dadosTelefone){
    if(dadosTelefone.numero == '' || dadosTelefone.numero == undefined || dadosTelefone.numero.length > 25 
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await telefoneDAO.insertTelefone(dadosTelefone);

        if(status){
            let dadosJSON = {};

            let telefoneNovoId = await telefoneDAO.selectLastId();
            dadosTelefone.id = telefoneNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.telefone = dadosTelefone;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }

}; 
 module.exports = {
    selecionarTodosNumeros,
    deletarTelefone,
    inserirTelefone
 }