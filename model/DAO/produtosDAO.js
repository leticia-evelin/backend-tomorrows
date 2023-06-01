/***************************************************************
 * Objetivo: Realizar a interação dos Produtos com o Banco de Dados.
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

    if(rsProdutos.length > 0){
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
     cor,
     preco,
     imagem,
     altura,
     largura,
     comprimento,
     tamanho_sigla,
     peso,
     categoria,
     id_ong 
    )
    values
    ('${dadosProdutos.nome}',
     '${dadosProdutos.descricao}',
     '${dadosProdutos.cor}',
     '${dadosProdutos.preco}',
     '${dadosProdutos.imagem}',
     '${dadosProdutos.altura}',
     '${dadosProdutos.largura}',
     '${dadosProdutos.comprimento}',
     '${dadosProdutos.tamanho_sigla}',
     '${dadosProdutos.peso}',
     '${dadosProdutos.categoria}',
     '${dadosProdutos.ong.id_ong[0]}'

    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

//Excluir um registro no banco
const deleteProduto = async function(idProduto){

    let sql = `delete from tbl_produtos where id = ${idProduto}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else    
        return false;    
}

//Atualiza um registro no banco
const updateProduto = async function(dadosProdutos){

    let sql = `update tbl_produtos set
    nome = '${dadosProdutos.nome}',
    descricao = '${dadosProdutos.descricao}',
    cor = '${dadosProdutos.cor}',
    preco = '${dadosProdutos.preco}',
    imagem = '${dadosProdutos.imagem}',
    altura = '${dadosProdutos.altura}',
    largura = '${dadosProdutos.largura}',
    comprimento = '${dadosProdutos.comprimento}',
    tamanho_sigla = '${dadosProdutos.tamanho_sigla}',
    peso = '${dadosProdutos.peso}',
    categoria = '${dadosProdutos.categoria}'
    where id = ${dadosProdutos.id}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else 
        return false;    
}

const selectLastId = async function(){
    //script para retornar apenas o última registro inserido na tabela  
    let sql = 'select * from tbl_produtos order by id desc limit 1';

    let rsProdutos = await prisma.$queryRawUnsafe(sql);

    if(rsProdutos.length > 0)
        return rsProdutos[0].id;
    else
        return false;    
}

//Retorna um registro filtrado pelo id do banco de dados
const selectByIdProduto = async function(id){

    //Variável com o script sql para executar no banco de dados
    let sql = `select * from tbl_produtos where id = ${id}`;
  
    let rsProdutos = await prisma.$queryRawUnsafe(sql);

    //valida se o banco de dados retornou algum registro
    if(rsProdutos.length > 0){
        return rsProdutos;
    } else {
        return false;
    }
}

      

module.exports = {
    selectAllProdutos,
    insertProdutos,
    deleteProduto,
    updateProduto,
    selectLastId,
    selectByIdProduto
}
