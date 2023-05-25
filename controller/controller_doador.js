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


//função para receber os dados do app e enviar para o model para inserir novo item
 const inserirDoador = async function(dadosDoador){

    if(dadosDoador.nome == '' || dadosDoador.nome == undefined || dadosDoador.nome.length > 50 ||
       dadosDoador.email == '' || dadosDoador.email == undefined || dadosDoador.email.length > 255 ||
       dadosDoador.cpf == '' || dadosDoador.cpf == undefined || dadosDoador.cpf.length > 45 ||
       dadosDoador.data_nascimento == '' || dadosDoador.data_nascimento == undefined || dadosDoador.data_nascimento.length > 10
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await doadorDAO.insertDoador(dadosDoador);

        if(status){
            let dadosJSON = {};

            let doadorNovoId = await doadorDAO.selectLastId();
            dadosDoador.id = doadorNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.aluno = dadosDoador;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }
 };

 module.exports = {
     selecionarTodosDoadores,
     inserirDoador
 }