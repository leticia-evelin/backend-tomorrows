/***************************************************************
 * Objetivo: Realizar a interação do Doador com o Banco de Dados.
 * Data: 02/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

const insertDoacao = async function(doacaoDoador){

    let sql = `insert into tbl_doacao_doador
    (id_doacao,
     id_doador
    )
    values
    ('${doacaoDoador.id_doacao}',
     '${doacaoDoador.id_doador}'
    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

const selectLastId = async function(){
    //script para retornar apenas o última registro inserido na tabela  
    let sql = 'select * from tbl_doacao_doador order by id desc limit 1';

    let rsDoacaoDoador = await prisma.$queryRawUnsafe(sql);

    if(rsDoacaoDoador.length > 0)
        return rsDoacaoDoador[0].id;
    else
        return false;    
}

module.exports = {
    insertDoacao,
    selectLastId
}