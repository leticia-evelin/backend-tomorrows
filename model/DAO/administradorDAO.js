/****************************************************************
 * Objetivo: Realizar a interação do login com o Banco de Dados.
 * Data: 01/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

//Inserir um novo registro no banco
const insertAdministrador = async function(dadosAdm){

    let sql = `insert into tbl_administrador
    (nome, 
     email,
     senha 
    )
    values
    ('${dadosAdm.nome}',
     '${dadosAdm.email}',
     '${dadosAdm.senha}'
    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

//Atualiza um registro no banco
const updateAdministrador = async function(dadosAdm){

    let sql = `update tbl_administrador set
    nome = '${dadosAdm.nome}',
    email = '${dadosAdm.email}',
    senha = '${dadosAdm.senha}'
    where id = ${dadosAdm.id}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else 
        return false;    
}

//Excluir um registro no banco
const deleteAdministrador = async function(idAdm){

    let sql = `delete from tbl_administrador where id = ${idAdm}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else    
        return false;    
}

const selectAllAdministradores = async () => {
    let sql = `select * from tbl_administrador`;
  
    let rsAdministrador = await prisma.$queryRawUnsafe(sql);
  
    if (rsAdministrador.length > 0) {
      return rsAdministrador;
    }
    return false;
  };

const selectLastId = async function(){
    //script para retornar apenas o última registro inserido na tabela  
    let sql = 'select * from tbl_administrador order by id desc limit 1';

    let rsAdministrador = await prisma.$queryRawUnsafe(sql);

    if(rsAdministrador.length > 0)
        return rsAdministrador[0].id;
    else
        return false;    
}

//Retorna um registro filtrado pelo id do banco de dados
const selectByIdAdministrador = async function(id){

    //Variável com o script sql para executar no banco de dados
    let sql = `select * from tbl_administrador where id = ${id}`;
  
    let rsAdministrador = await prisma.$queryRawUnsafe(sql);

    //valida se o banco de dados retornou algum registro
    if(rsAdministrador.length > 0){
        return rsAdministrador;
    } else {
        return false;
    }
}


module.exports = {
    insertAdministrador,
    updateAdministrador,
    deleteAdministrador,
    selectAllAdministradores,
    selectLastId,
    selectByIdAdministrador
}