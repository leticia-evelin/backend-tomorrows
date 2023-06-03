/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 02/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

var doacao_doadorDAO = require('../model/DAO/doacao_doadorDAO');
var message = require('./modulo/config.js');



const inserirDoacaoDoador = async function(doacaoDoador){
    if(doacaoDoador.id_doacao        == '' || doacaoDoador.id_doacao  == undefined || isNaN(doacaoDoador.id_doacao) ||
       doacaoDoador.id_doador           == '' || doacaoDoador.id_doador == undefined || isNaN(doacaoDoador.id_doador)
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await doacao_doadorDAO.inserirDoacaoDoador(doacaoDoador);

        if(status){
            let dadosJSON = {};

            let doacaoDoadorNovoId = await doacao_doadorDAO.selectLastId();
            doacaoDoador.id = doacaoDoadorNovoId

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.doacaoDoador = doacaoDoador;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }
};    

module.exports = {
    inserirDoacaoDoador
}