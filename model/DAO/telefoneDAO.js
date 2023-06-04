/***************************************************************
 * Objetivo: Realizar a interação do Doador com o Banco de Dados.
 * Data: 03/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/
//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

//Inserir um novo registro no banco
const insertTelefone = async function(dadosTelefone){

  let sql = `insert into tbl_telefone
  (numero
  )
  values
  ('${dadosTelefone.numero}'
  )`;

  let result = await prisma.$executeRawUnsafe(sql);

  if (result)
    return true;
  else 
    return false;    
}

//Listar todos os regitros
const selectAllTelefones = async () => {
  let sql = `select * from tbl_telefone`;

  let rsTelefone = await prisma.$queryRawUnsafe(sql);

  if (rsTelefone.length > 0) {
    return rsTelefone;
  }
  return false;
};

//Excluir um registro no banco
const deleteTelefone = async function(idTelefone){

  let sql = `delete from tbl_telefone where id = ${idTelefone}`

  let result = await prisma.$executeRawUnsafe(sql);

  if(result)
    return true
  else    
    return false;    
}

const selectLastId = async function(){
  //script para retornar apenas o última registro inserido na tabela  
  let sql = 'select * from tbl_telefone order by id desc limit 1';

  let rsTelefone = await prisma.$queryRawUnsafe(sql);

  if(rsTelefone.length > 0)
    return rsTelefone[0].id;
  else
    return false;    
}


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
    insertTelefone,
    selectAllTelefones,
    deleteTelefone,
    selectLastId,
    selectTelefoneByForeignKey
  }