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

//Inserir um novo registro no banco
const insertDoador = async function(dadosDoador){

    let sql = `insert into tbl_doador
    (nome, 
     email, 
     cpf, 
     data_nascimento
    )
    values
    ('${dadosDoador.nome}',
     '${dadosDoador.email}',
     '${dadosDoador.cpf}',
     '${dadosDoador.data_nascimento}'

    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

//Excluir um registro no banco
const deleteDoador = async function(idDoador){

    let sql = `delete from tbl_doador where id = ${idDoador}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else    
        return false;    
}

const selectLastId = async function(){
    //script para retornar apenas o última registro inserido na tabela  
    let sql = 'select * from tbl_doador order by id desc limit 1';

    let rsDoador = await prisma.$queryRawUnsafe(sql);

    if(rsDoador.length > 0)
        return rsDoador[0].id;
    else
        return false;    
}


module.exports = {
    selectAllDoador,
    insertDoador,
    selectLastId,
    deleteDoador
}