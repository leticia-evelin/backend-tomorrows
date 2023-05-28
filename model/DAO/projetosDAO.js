/***************************************************************
 * Objetivo: Realizar a interação do Doador com o Banco de Dados.
 * Data: 27/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

//Retorna todos os registros do banco
const selectAllProjetos = async function(){

    let sql = 'select * from tbl_projetos';

    //rs = result set
    let rsProjetos = await prisma.$queryRawUnsafe(sql);

    if(rsProjetos.length > 0){
        return rsProjetos;
    } else {
        return false;
    }
}

//Inserir um novo registro no banco
const insertProjetos = async function(dadosProjetos){

        let sql = `insert into tbl_projetos
        (nome, 
         descricao,
         imagem,
         id_ong 
        )
        values
        ('${dadosProjetos.nome}',
         '${dadosProjetos.descricao}',
         '${dadosProjetos.imagem}',
         '${dadosProjetos.id_ong}'
    
        )`;
    
        let result = await prisma.$executeRawUnsafe(sql);
    
        if (result)
            return true;
        else 
            return false;    
}

//Excluir um registro no banco
const deleteProjetos = async function(idProjeto){

    let sql = `delete from tbl_projetos where id = ${idProjeto}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else    
        return false;    
}

//Atualiza um registro no banco
const updateProjeto = async function(dadosProjetos){

    let sql = `update tbl_projetos set
    nome = '${dadosProjetos.nome}',
    descricao = '${dadosProjetos.descricao}',
    imagem = '${dadosProjetos.imagem}'
    where id = ${dadosProjetos.id}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else 
        return false;    
}

const selectLastId = async function(){
        //script para retornar apenas o última registro inserido na tabela  
        let sql = 'select * from tbl_projetos order by id desc limit 1';
    
        let rsProjetos = await prisma.$queryRawUnsafe(sql);
    
        if(rsProjetos.length > 0)
            return rsProjetos[0].id;
        else
            return false;    
}

module.exports = {
    selectAllProjetos,
    insertProjetos,
    deleteProjetos,
    updateProjeto,
    selectLastId
}