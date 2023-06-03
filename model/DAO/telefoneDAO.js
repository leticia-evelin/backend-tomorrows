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


  module.exports = {
    insertTelefone
  }