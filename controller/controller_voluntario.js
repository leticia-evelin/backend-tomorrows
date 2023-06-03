/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 02/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/


var voluntarioDAO = require('../model/DAO/voluntarioDAO.js');
var message = require('./modulo/config.js');


const inserirVoluntario = async function(dadosVoluntario){
    if(dadosVoluntario.nome            == '' || dadosVoluntario.nome  == undefined || dadosVoluntario.nome.length > 50 ||
       dadosVoluntario.email           == '' || dadosVoluntario.email == undefined || dadosVoluntario.email.length > 255 ||
       dadosVoluntario.data_nascimento == '' || dadosVoluntario.data_nascimento == undefined || dadosVoluntario.data_nascimento.length > 10 ||
       dadosVoluntario.cpf             == '' || dadosVoluntario.cpf   == undefined || dadosVoluntario.cpf.length > 45
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await voluntarioDAO.insertVoluntario(dadosVoluntario);

        if(status){
            let dadosJSON = {};

            let voluntarioNovoId = await voluntarioDAO.selectLastId();
            dadosVoluntario.id = voluntarioNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.voluntario = dadosVoluntario;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }

};

const selecionarTodosVoluntarios = async function(){

    let dadosVoluntario = await voluntarioDAO.selectAllVoluntarios();

    let dadosJSON = {};

    if(dadosVoluntario){
        dadosJSON.status = 200;

        dadosJSON.count = dadosVoluntario.length;

        dadosJSON.voluntarios = dadosVoluntario;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

 //função para excluir um doador pelo id, irá para o model
const deletarVoluntario = async function(idVoluntario){

    if(idVoluntario == '' || idVoluntario == undefined || isNaN(idVoluntario)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await voluntarioDAO.deleteVoluntario(idVoluntario);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };
module.exports = {
    inserirVoluntario,
    selecionarTodosVoluntarios,
    deletarVoluntario
}