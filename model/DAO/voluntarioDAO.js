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
     id_genero,
     id_telefone 
    )
    values
    ('${dadosVoluntario.nome}',
     '${dadosVoluntario.email}',
     '${dadosVoluntario.data_nascimento}',
     '${dadosVoluntario.cpf}',
     '${dadosVoluntario.id_genero}',
     '${dadosVoluntario.id_telefone}'
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

const selectGeneroByForeignKey = async (idGenero) => {
  try {
    const sql = `
      SELECT nome
      FROM tbl_genero
      WHERE id = ${idGenero};
    `;
    const result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar o telefone:', error);
    throw error;
  }
};

// Função para buscar o telefone pelo ID de chave estrangeira
const selectTelefoneByForeignKey = async (idTelefone) => {
    try {
      const sql = `
        SELECT numero
        FROM tbl_telefone
        WHERE id = ${idTelefone};
      `;
      const result = await prisma.$queryRawUnsafe(sql);
  
      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o telefone:', error);
      throw error;
    }
  };

module.exports = {
    insertVoluntario,
    selectAllVoluntarios,
    deleteVoluntario,
    selectLastId,
    selectTelefoneByForeignKey,
    selectGeneroByForeignKey
}