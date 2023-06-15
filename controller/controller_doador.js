/***************************************************************
 * Objetivo: Implementar a regra de negócios entre o app e model
 * Data: 25/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/


 var doadorDAO = require('../model/DAO/doadorDAO.js');
 var message = require('./modulo/config.js');



 //função para retornar todos os itens da tabela recebidos do model
//  const selecionarTodosDoadores = async function(){

//     let dadosDoador = await doadorDAO.selectAllDoador();

//     let dadosJSON = {};

//     if(dadosDoador){
//         dadosJSON.status = 200;

//         dadosJSON.count = dadosDoador.length;

//           // Iterar sobre os doadores e buscar os números de telefone
//           for (let i = 0; i < dadosDoador.length; i++) {
//             let telefone = await telefoneDAO.selectTelefoneByForeignKey(dadosDoador[i].id_telefone);
    
//             if (telefone) {
//                 // Cria o objeto com o ID do telefone e o número
//                 let telefoneObj = {
//                   id_telefone: dadosDoador[i].id_telefone,
//                   numero: telefone.numero,
//                 };

//              // Cria ou atualiza o array de telefones no doador
//              if (dadosDoador[i].telefones) {
//                 dadosDoador[i].telefones.push(telefoneObj);
//             } else {
//                 dadosDoador[i].telefones = [telefoneObj];
//             }
//         }

//       }  



//         dadosJSON.doadores = dadosDoador;
//         return dadosJSON;

//     } else {
//         return message.ERROR_NOT_FOUND;
//     }
//  };

const selecionarTodosDoadores = async function(){

    let dadosDoador = await doadorDAO.selectAllDoador();

    let dadosJSON = {};

    if(dadosDoador){
        dadosJSON.status = 200;

        dadosJSON.count = dadosDoador.length;

        dadosJSON.doador = dadosDoador;
        return dadosJSON;

    } else {
        return message.ERROR_NOT_FOUND;
    }
}

//função para receber os dados do app e enviar para o model para inserir novo item
 const inserirDoador = async function(dadosDoador){

    if(dadosDoador.nome            == '' || dadosDoador.nome            == undefined || dadosDoador.nome.length            > 50 ||
       dadosDoador.email           == '' || dadosDoador.email           == undefined || dadosDoador.email.length          > 255 ||
       dadosDoador.cpf             == '' || dadosDoador.cpf             == undefined || dadosDoador.cpf.length             > 45 ||
       dadosDoador.data_nascimento == '' || dadosDoador.data_nascimento == undefined || dadosDoador.data_nascimento.length > 10 ||
       dadosDoador.telefone == '' || dadosDoador.telefone == undefined || dadosDoador.telefone.length > 20
    ){
        return message.ERROR_REQUIRED_DATA;

    } else {

        let status = await doadorDAO.insertDoador(dadosDoador);

        if(status){
            let dadosJSON = {};

            let doadorNovoId = await doadorDAO.selectLastId();
            dadosDoador.id = doadorNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.doador = dadosDoador;

            return dadosJSON;

        } else 
            return message.ERROR_INTERNAL_SERVER;   

    }
 };

 //função para excluir um doador pelo id, irá para o model
 const deletarDoador = async function(idDoador){

    if(idDoador == '' || idDoador == undefined || isNaN(idDoador)){
        return message.ERROR_REQUIRED_ID
    } else {

        let status = await doadorDAO.deleteDoador(idDoador);

        if(status)
            return message.DELETED_ITEM
        else 
            return message.ERROR_INTERNAL_SERVER    

    }
 };

 const atualizarDoador = async function(dadosDoador, idDoador){

    if(dadosDoador.nome            == '' || dadosDoador.nome            == undefined || dadosDoador.nome.length            > 50 ||
       dadosDoador.email           == '' || dadosDoador.email           == undefined || dadosDoador.email.length          > 255 ||
       dadosDoador.cpf             == '' || dadosDoador.cpf             == undefined || dadosDoador.cpf.length             > 45 ||
       dadosDoador.data_nascimento == '' || dadosDoador.data_nascimento == undefined || dadosDoador.data_nascimento.length > 10 ||
       dadosDoador.telefone == '' || dadosDoador.telefone == undefined || dadosDoador.telefone.length > 20
    ){
        return message.ERROR_REQUIRED_DATA;

    } else if(idDoador == '' || idDoador == undefined || isNaN(idDoador)){
        return message.ERROR_REQUIRED_ID;
        
    } else {
        dadosDoador.id = idDoador;

        let status = await doadorDAO.updateDoador(dadosDoador);

        if(status){
            let dadosJSON = {};
            let doadorId = await doadorDAO.selectLastId();
            dadosDoador.id = doadorId;

            dadosJSON.status = message.UPDATED_ITEM.status;
            dadosJSON.doador = dadosDoador;
            return dadosJSON;
        } else 
            return message.ERROR_INTERNAL_SERVER;
    }
 }

 //função para buscar um item filtrando pelo id, será encaminhado para o model
const buscarIdDoador = async function(id){

    //Validação para o ID
    if(id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {     

      //Solicita ao DAO todos os patrocinadores do banco de dados
      let dadosDoador = await doadorDAO.selectByIdDoador(id);

      //Cira um objeto do tipo JSON
      let dadosJSON = {};
  
      //Valida se o banco de dados teve registros, 
      //se sim adiciona o array de patrocinadores em um JSON para retornar ao app
      if(dadosDoador){
          dadosJSON.status = 200;
          dadosJSON.doador = dadosDoador;
          return dadosJSON;
     } else {
          return message.ERROR_NOT_FOUND;   
        }
    }  
};


 module.exports = {
     selecionarTodosDoadores,
     inserirDoador,
     deletarDoador,
     atualizarDoador,
     buscarIdDoador
 }