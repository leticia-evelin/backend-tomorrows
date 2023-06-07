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
     valor,
     id_doador
    )
    values
    ('${dadosDoacao.tipo_doacao}',
     '${dadosDoacao.valor}',
     '${dadosDoacao.id_doador}'
    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

//Listar todos os regitros
const selectAllDoacoes = async () => {
    // let sql = `select * from tbl_doacao`;

    let sql = `select tbl_doador.id as id_doador, tbl_doador.cpf, tbl_doacao.tipo_doacao, tbl_doacao.valor, tbl_doador.nome as nome_doador, tbl_doador.email, tbl_doador.telefone
               from tbl_doacao
                    inner join tbl_doador
                        on tbl_doador.id = tbl_doacao.id_doador;  `
  
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

//Excluir um registro no banco
const deleteDoacao = async function(idDoacao){

    let sql = `delete from tbl_doacao where id = ${idDoacao}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else    
        return false;    
}

module.exports = {
    insertDoacao,
    selectAllDoacoes,
    deleteDoacao,
    selectLastId
}