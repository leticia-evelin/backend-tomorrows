/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 02/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/


var voluntarioDAO = require('../model/DAO/voluntarioDAO.js');
var telefoneDAO = require('../model/DAO/telefoneDAO.js');
var message = require('./modulo/config.js');



const inserirVoluntario = async function(dadosVoluntario){
    if(dadosVoluntario.nome            == '' || dadosVoluntario.nome  == undefined || dadosVoluntario.nome.length > 50 ||
       dadosVoluntario.email           == '' || dadosVoluntario.email == undefined || dadosVoluntario.email.length > 255 ||
       dadosVoluntario.data_nascimento == '' || dadosVoluntario.data_nascimento == undefined || dadosVoluntario.data_nascimento.length > 10 ||
       dadosVoluntario.cpf             == '' || dadosVoluntario.cpf   == undefined || dadosVoluntario.cpf.length > 45 ||
       dadosVoluntario.telefone        == '' || dadosVoluntario.telefone   == undefined || dadosVoluntario.telefone.length > 20 ||
        dadosVoluntario.id_genero    == null || isNaN(dadosVoluntario.id_genero) 
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

        // let status = await voluntarioDAO.insertVoluntario(dadosVoluntario);

        // if(status){
        //     let dadosJSON = {};
        //  // Obter o último ID do telefone cadastrado
        //     let ultimoIdTelefone = await telefoneDAO.selectLastId();

        //     let voluntarioNovoId = await voluntarioDAO.selectLastId();
           

        //     dadosJSON.status = message.CREATED_ITEM.status;
        //     dadosJSON.voluntario = {
        //         ...dadosVoluntario,
        //         id: voluntarioNovoId,
        //         id_telefone: ultimoIdTelefone,
        //     }

        //     return dadosJSON;

        // } else 
        //     return message.ERROR_INTERNAL_SERVER;    

    }

};

const selecionarTodosVoluntarios = async function(){

    let dadosVoluntario = await voluntarioDAO.selectAllVoluntarios();

    let dadosJSON = {};

    if(dadosVoluntario){
        dadosJSON.status = 200;
        dadosJSON.count = dadosVoluntario.length;


        // Iterar sobre os voluntários e buscar os números de telefone
        for (let i = 0; i < dadosVoluntario.length; i++) {
        // let telefone = await telefoneDAO.selectTelefoneByForeignKey(dadosVoluntario[i].id_telefone);
        let genero = await voluntarioDAO.selectGeneroByForeignKey(dadosVoluntario[i].id_genero);
    
        if(genero){
            dadosVoluntario[i].genero = genero.nome;
        }    

        // if (telefone) {
        //   // Cria o objeto com o ID do telefone e o número
        //   let telefoneObj = {
        //     id_telefone: dadosVoluntario[i].id_telefone,
        //     numero: telefone.numero,
        // };

        //  // Cria ou atualiza o array de telefones no voluntário
        //     if (dadosVoluntario[i].telefones) {
        //         dadosVoluntario[i].telefones.push(telefoneObj);
        //     } else {
        //         dadosVoluntario[i].telefones = [telefoneObj];
        //     }
        // }

      }

        dadosJSON.voluntarios = dadosVoluntario;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };


// const selecionarTodosVoluntarios = async function(){

//     let dadosVoluntario = await voluntarioDAO.selectAllVoluntarios();

//     let dadosJSON = {};

//     if(dadosVoluntario){
//         dadosJSON.status = 200;

//         dadosJSON.count = dadosVoluntario.length;

//         dadosJSON.voluntario = dadosVoluntario;
//         return dadosJSON;

//     } else {
//         return message.ERROR_NOT_FOUND;
//     }
// }

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