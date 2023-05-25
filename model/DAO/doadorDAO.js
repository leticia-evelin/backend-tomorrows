/***************************************************************
 * Objetivo: Realizar a interação do Doador com o Banco de Dados.
 * Data: 25/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();


//Retorna todos os registros do banco
const selectAllDoador = async function(){

    let sql = 'select * from tbl_doador';

    //rs = result set
    let rsDoador = await prisma.$queryRawUnsafe(sql);

    if(rsDoador.length > 0){
        return rsDoador;
    } else {
        return false;
    }
      
}


module.exports = {
    selectAllDoador
}