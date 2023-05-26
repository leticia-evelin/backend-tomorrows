/***************************************************************
 * Objetivo: Realizar a interação do Doador com o Banco de Dados.
 * Data: 26/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

//Retorna todos os registros do banco
const selectAllProdutos = async function(){

    let sql = 'select * from tbl_produtos';

    //rs = result set
    let rsProdutos = await prisma.$queryRawUnsafe(sql);

    if(rsDoador.length > 0){
        return rsProdutos;
    } else {
        return false;
    }

}

    //Inserir um novo registro no banco
const insertProdutos = async function(dadosProdutos){

    let sql = `insert into tbl_produtos
    (nome, 
     descricao,
     preco,
     imagem,
     largura,
     comprimento,
     tamanho_sigla,
     peso,
     categoria, 
    )
    values
    ('${dadosProdutos.nome}',
     '${dadosProdutos.descricao}',
     '${dadosProdutos.preco}',
     '${dadosProdutos.imagem}',
     '${dadosProdutos.largura}',
     '${dadosProdutos.comprimento}',
     '${dadosProdutos.tamanho_sigla}',
     '${dadosProdutos.peso}',
     '${dadosProdutos.categoria}',
     '${dadosProdutos.id_ong}'

    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

      

module.exports = {
    selectAllProdutos,
    insertProdutos
}
