/*************************************************************
 * Objetivo: Implementação do JWT no projeto
 * Data: 01/06/2023
 * Autor: Letícia Evelin
 * Versão: 1.0
 ************************************************************/

//Importe da biblioteca
const jwt = require('jsonwebtoken');
//Chave secreta para a criação do JWT
const SECRET = 't1w2a3';
//Tempo para validar o token  do JWT (segundos)
const EXPIRES = 60;

//Criação do JWT (retorna um token)
const createJWT = async function(payLoad){

    //Gera o token 
        // payLoad - a identificação do usuário autenticado
        // SECRET - a chave secreta
        // expiresIn - tempo de expiração do token
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES});

    return token; 
}

//Validação de autencidade do JWT (recebe o token para validação)
const validateJWT = async function(token){

    let status = false;

    //Valida a autenticidade do token
    jwt.verify(token, SECRET, async function (err, decode){

        if(!err)
            status = true;

        return status;    

    });
}

module.exports = {
    createJWT,
    validateJWT
}