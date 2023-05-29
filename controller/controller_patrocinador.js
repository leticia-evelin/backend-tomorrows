/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 29/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/


var patrocinadorDAO = require('../model/DAO/patrocinadorDAO.js');
var message = require('./modulo/config.js');



const inserirPatrocinador = async function(dadosPatrocinador){

    if(dadosPatrocinador.razao_social == '' || dadosPatrocinador.razao_social == undefined || dadosPatrocinador.razao_social > 80 ||
       dadosPatrocinador.cnpj == '' || dadosPatrocinador.cnpj == undefined || dadosPatrocinador.cnpj > 45 ||
       dadosPatrocinador.email == '' || dadosPatrocinador.email == undefined || dadosPatrocinador.email > 255 ||       
       dadosPatrocinador.id_ong    == null || isNaN(dadosPatrocinador.id_ong)
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await patrocinadorDAO.insertPatrocinador(dadosPatrocinador);

        if(status){
            let dadosJSON = {};

            let patrocinadorNovoId = await patrocinadorDAO.selectLastId();
            dadosPatrocinador.id = patrocinadorNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.patrocinador = dadosPatrocinador;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;    

    }
 };

 //função para selecionar todos os regitros
 const selecionarTodosPatrocinadores = async function(){

    let dadosPatrocinador = await patrocinadorDAO.selectAllPatrocinadores();

    let dadosJSON = {};

    if(dadosPatrocinador){
        dadosJSON.status = 200;

        dadosJSON.count = dadosPatrocinador.length;

        dadosJSON.patrocinador = dadosPatrocinador;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
 };

 
 const atualizarPatrocinador = async function(dadosPatrocinador, idPatrocinador){

    if(dadosPatrocinador.razao_social == '' || dadosPatrocinador.razao_social == undefined || dadosPatrocinador.razao_social > 80 ||
       dadosPatrocinador.cnpj == '' || dadosPatrocinador.cnpj == undefined || dadosPatrocinador.cnpj > 45 ||
       dadosPatrocinador.email == '' || dadosPatrocinador.email == undefined || dadosPatrocinador.email > 255 ||       
       dadosPatrocinador.id_ong    == null || isNaN(dadosPatrocinador.id_ong)
    )
    {
        return message.ERROR_REQUIRED_DATA;

    } else if(idPatrocinador == '' || idPatrocinador == undefined || isNaN(idPatrocinador)){
        return message.ERROR_REQUIRED_ID;
        
    } else {
        dadosPatrocinador.id = idPatrocinador;

        let status = await patrocinadorDAO.updatePatrocinador(dadosPatrocinador);

        if(status){
            let dadosJSON = {};
            let patrocinadorId = await patrocinadorDAO.selectLastId();
            dadosPatrocinador.id = patrocinadorId;

            dadosJSON.status = message.UPDATED_ITEM.status;
            dadosJSON.patrocinador = dadosPatrocinador;
            return dadosJSON;
        } else 
            return message.ERROR_INTERNAL_SERVER;
    }
 }


//função para buscar um item filtrando pelo id, será encaminhado para o model
const buscarIdPatrocinador = async function(id){

    //Validação para o ID
    if(id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {     

      //Solicita ao DAO todos os patrocinadores do banco de dados
      let dadosPatrocinador = await patrocinadorDAO.selectByIdPatrocinador(id);

      //Cira um objeto do tipo JSON
      let dadosJSON = {};
  
      //Valida se o banco de dados teve registros, 
      //se sim adiciona o array de patrocinadores em um JSON para retornar ao app
      if(dadosPatrocinador){
          dadosJSON.status = 200;
          dadosJSON.patrocinador = dadosPatrocinador;
          return dadosJSON;
     } else {
          return message.ERROR_NOT_FOUND;   
        }
    }  
};

 //função para excluir um produto pelo id, irá para o model
 const deletarPatrocinador = async function(idPatrocinador){

    if(idPatrocinador == '' || idPatrocinador == undefined || isNaN(idPatrocinador)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await patrocinadorDAO.deletePatrocinador(idPatrocinador);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };


module.exports = {
    inserirPatrocinador,
    selecionarTodosPatrocinadores,
    deletarPatrocinador,
    atualizarPatrocinador,
    buscarIdPatrocinador
}