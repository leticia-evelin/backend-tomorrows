/****************************************************************
 * Objetivo: Realizar a interação dos Produtos com o Banco de Dados.
 * Data: 29/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma client 
var {PrismaClient} = require('@prisma/client');

var prisma = new PrismaClient();

//Retorna todos os registros do banco
const selectAllPatrocinadores = async function(){

    let sql = 'select * from tbl_patrocinador';

    //rs = result set
    let rsPatrocinador = await prisma.$queryRawUnsafe(sql);

    if(rsPatrocinador.length > 0){
        return rsPatrocinador;
    } else {
        return false;
    }
}

//Retorna um registro filtrado pelo id do banco de dados
const selectByIdPatrocinador = async function(id){

    //Variável com o script sql para executar no banco de dados
    let sql = `select * from tbl_patrocinador where id = ${id}`;
  
    let rsPatrocinador = await prisma.$queryRawUnsafe(sql);

    //valida se o banco de dados retornou algum registro
    if(rsPatrocinador.length > 0){
        return rsPatrocinador;
    } else {
        return false;
    }
}


//Inserir um novo registro no banco
const insertPatrocinador = async function(dadosPatrocinador){

    let sql = `insert into tbl_patrocinador
    (razao_social, 
     cnpj,
     email,
     id_ong 
    )
    values
    ('${dadosPatrocinador.razao_social}',
     '${dadosPatrocinador.cnpj}',
     '${dadosPatrocinador.email}',
     '${dadosPatrocinador.id_ong}'
    )`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else 
        return false;    
}

//Atualiza um registro no banco
const updatePatrocinador = async function(dadosPatrocinador){

    let sql = `update tbl_patrocinador set
    razao_social = '${dadosPatrocinador.razao_social}',
    cnpj = '${dadosPatrocinador.cnpj}',
    email = '${dadosPatrocinador.email}'
    where id = ${dadosPatrocinador.id}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else 
        return false;    
}


//Excluir um registro no banco
const deletePatrocinador = async function(idPatrocinador){

    let sql = `delete from tbl_patrocinador where id = ${idPatrocinador}`

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else    
        return false;    
}

const selectLastId = async function(){
    //script para retornar apenas o última registro inserido na tabela  
    let sql = 'select * from tbl_patrocinador order by id desc limit 1';

    let rsPatrocinador = await prisma.$queryRawUnsafe(sql);

    if(rsPatrocinador.length > 0)
        return rsPatrocinador[0].id;
    else
        return false;    
}

module.exports = {
    selectAllPatrocinadores,
    selectByIdPatrocinador,
    insertPatrocinador,
    updatePatrocinador,
    deletePatrocinador,
    selectLastId
}