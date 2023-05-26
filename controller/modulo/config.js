/*****************************************************************************************
 * Objetivo: Arquivo responsável pelas variáveis, constantes e funções globais do projeto
 * Data: 25/05/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 *****************************************************************************************/


 /**********************************Constantes de erros************************************/
 const ERROR_REQUIRED_DATA = {status: 400, message: 'Existem dados obrigatórios que não foram preenchidos!'};
 const ERROR_INTERNAL_SERVER = {status: 500, message: 'Erro interno no servidor de banco de dados.'};
 const ERROR_REQUIRED_ID = {status: 400, message: 'O atributo id é obrigatório na requisição!'};
 const ERROR_REQUIRED_NAME = {status: 400, message: 'O atributo nome é obrigatório na requisição!'};
 const ERROR_NOT_FOUND = {status: 404, message: 'Nenhum registro encontrado na requisição!'}
 const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O tipo de mídia Content type da solicitação não é compatível com o servidor, [application/json].'};



 /**********************************Constantes de sucesso************************************/
 const UPDATED_ITEM = {status: 200, message: 'Registro atualizado com sucesso!'};
 const CREATED_ITEM = {status: 201, message: 'Registro criado com sucesso!'};
 const DELETED_ITEM = {status: 200, message: 'Registro excluído com sucesso!'};




 module.exports = {
    UPDATED_ITEM,
    CREATED_ITEM,
    DELETED_ITEM,
    ERROR_REQUIRED_DATA,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    ERROR_REQUIRED_NAME,
    ERROR_REQUIRED_ID,
    ERROR_INTERNAL_SERVER
 }