/***************************************************************
 * Objetivo: Realizar a interação do Doador com o Banco de Dados.
 * Data: 02/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

const insertDoacao = async function(dadosDoacao){

    let sql = `insert into tbl_doacao
    (tipo_doacao, 
     valor
    )
    values
    ('${dadosDoacao.tipo_doacao}',
     '${dadosDoacao.valor}'
    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

//Listar todos os regitros
const selectAllDoacoes = async () => {
    let sql = `select * from tbl_doacao`;
  
    let rsDoacao = await prisma.$queryRawUnsafe(sql);
  
    if (rsDoacao.length > 0) {
      return rsDoacao;
    }
    return false;
  };

const selectLastId = async function(){
    //script para retornar apenas o última registro inserido na tabela  
    let sql = 'select * from tbl_doacao order by id desc limit 1';

    let rsDoacao = await prisma.$queryRawUnsafe(sql);

    if(rsDoacao.length > 0)
        return rsDoacao[0].id;
    else
        return false;    
}

module.exports = {
    insertDoacao,
    selectAllDoacoes,
    selectLastId
}