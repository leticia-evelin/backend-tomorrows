/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 01/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

var administradorDAO = require('../model/DAO/administradorDAO.js');
var message = require('./modulo/config.js');
var jwt = require('../middleware/middlewareJWT.js')

//função para selecionar todos os regitros
const selecionarTodosAdministradores = async function(){

    let dadosAdm = await administradorDAO.selectAllAdministradores();

    let dadosJSON = {};

    if(dadosAdm){
        dadosJSON.status = 200;

        dadosJSON.count = dadosAdm.length;
        // let tokenUser = await jwt.createJWT(dadosAdm.id);
        // dadosAdm.token = tokenUser
        dadosJSON.administradores = dadosAdm;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

 //função para excluir um projeto pelo id, irá para o model
 const deletarAdministrador = async function(idAdm){

    if(idAdm == '' || idAdm == undefined || isNaN(idAdm)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await administradorDAO.deleteAdministrador(idAdm);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };

//função para receber os dados do app e enviar para o model para inserir novo item
const inserirAdministrador = async function(dadosAdm){

    if(dadosAdm.nome         == '' || dadosAdm.nome          == undefined || dadosAdm.nome.length > 50 ||
       dadosAdm.email        == '' || dadosAdm.email        == undefined || dadosAdm.email.length > 255 ||
       dadosAdm.senha        == '' || dadosAdm.senha        == undefined || dadosAdm.senha.length > 50 
      
    ){
        return message.ERROR_REQUIRED_DATA;

    } if (!dadosAdm.email.includes('@')) {
        return message.ERROR_INVALID_EMAIL;

      } 

        let status = await administradorDAO.insertAdministrador(dadosAdm);

        if(status){
            let dadosJSON = {};

            let administradorNovoId = await administradorDAO.selectLastId();
            dadosAdm.id = administradorNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.administrador = dadosAdm;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    };
 

    //função para atualizar um administrador
const atualizarAdministrador = async function(dadosAdm, idAdm){

    if(dadosAdm.nome         == '' || dadosAdm.nome          == undefined || dadosAdm.nome.length > 50 ||
       dadosAdm.email        == '' || dadosAdm.email        == undefined || dadosAdm.email.length > 255 ||
       dadosAdm.senha        == '' || dadosAdm.senha        == undefined || dadosAdm.senha.length > 50 
      
    ){
        return message.ERROR_REQUIRED_DATA;

    } if (!dadosAdm.email.includes('@')) {
        return message.ERROR_INVALID_EMAIL;

      } else if(idAdm == '' || idAdm == undefined || isNaN(idAdm)){
        return message.ERROR_REQUIRED_ID;
        
    } else {
        dadosAdm.id = idAdm;

        let status = await administradorDAO.updateAdministrador(dadosAdm);

        if(status){
            let dadosJSON = {};
            let administradorId = await administradorDAO.selectLastId();
            dadosAdm.id = administradorId;

            dadosJSON.status = message.UPDATED_ITEM.status;
            dadosJSON.administrador = dadosAdm;
            return dadosJSON;
        } else 
            return message.ERROR_INTERNAL_SERVER;
    }
 }

const buscarIdAdministrador = async function(id){

    //Validação para o ID
    if(id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {     

      //Solicita ao DAO todos os patrocinadores do banco de dados
      let dadosAdm = await administradorDAO.selectByIdAdministrador(id);

      //Cira um objeto do tipo JSON
      let dadosJSON = {};
  
      //Valida se o banco de dados teve registros, 
      if(dadosAdm){
          dadosJSON.status = 200;
          dadosJSON.administrador = dadosAdm;
          return dadosJSON;
     } else {
          return message.ERROR_NOT_FOUND;   
        }
    }  
};

 module.exports = {
    selecionarTodosAdministradores,
    deletarAdministrador,
    inserirAdministrador,
    atualizarAdministrador,
    buscarIdAdministrador
 }