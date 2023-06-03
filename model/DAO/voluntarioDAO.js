/***************************************************************
 * Objetivo: Realizar a interação do Doador com o Banco de Dados.
 * Data: 02/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

//Inserir um novo registro no banco
const insertVoluntario = async function(dadosVoluntario){

    let sql = `insert into tbl_voluntarios
    (nome, 
     email,
     data_nascimento,
     cpf,
     id_genero 
    )
    values
    ('${dadosVoluntario.nome}',
     '${dadosVoluntario.email}',
     '${dadosVoluntario.data_nascimento}',
     '${dadosVoluntario.cpf}',
     '${dadosVoluntario.id_genero}'
    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

//Listar todos os regitros
const selectAllVoluntarios = async () => {
    let sql = `select * from tbl_voluntarios`;
  
    let rsVoluntario = await prisma.$queryRawUnsafe(sql);
  
    if (rsVoluntario.length > 0) {
      return rsVoluntario;
    }
    return false;
  };

//Excluir um registro no banco
const deleteVoluntario = async function(idVoluntario){

    let sql = `delete from tbl_voluntarios where id = ${idVoluntario}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else    
        return false;    
}


const selectLastId = async function(){
    //script para retornar apenas o última registro inserido na tabela  
    let sql = 'select * from tbl_voluntarios order by id desc limit 1';

    let rsVoluntario = await prisma.$queryRawUnsafe(sql);

    if(rsVoluntario.length > 0)
        return rsVoluntario[0].id;
    else
        return false;    
}

module.exports = {
    insertVoluntario,
    selectAllVoluntarios,
    deleteVoluntario,
    selectLastId
}