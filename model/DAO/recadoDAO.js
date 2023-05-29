/****************************************************************
 * Objetivo: Realizar a interação dos Recados com o Banco de Dados.
 * Data: 29/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

//Retorna todos os registros do banco
const selectAllRecados = async function(){

    let sql = 'select * from tbl_recado';

    let rsRecado = await prisma.$queryRawUnsafe(sql);

    if(rsRecado.length > 0){
        return rsRecado;
    } else {
        return false;
    }
}

//Retorna um registro filtrado pelo id do banco de dados
const selectByIdRecado = async function(id){

    let sql = `select * from tbl_recado where id = ${id}`;
  
    let rsRecado = await prisma.$queryRawUnsafe(sql);

    if(rsRecado.length > 0){
        return rsRecado;
    } else {
        return false;
    }
}



module.exports = {
    selectAllRecados,
    selectByIdRecado
}