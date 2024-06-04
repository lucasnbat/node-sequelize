// auth.json é uma secret, auth.js é o middleware de autenticação de sessão

const jwt = require('jsonwebtoken');

//importa a secret
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provider' })
    }

    const parts = authHeader.split(' ');

    // token não veio com duas partes?
    if (!parts.length == 2) {
        return res.status(401).send({ error: 'Token error!' })
    }

    // extrai o token
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malFormatted' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });

        // criando um id para a req para identificar requisições de alguem ja autenticadao
        // nomeei esse id de idEmployeeReq
        req.idEmployeeReq = decoded.idEmployee;

        console.log(decoded.idEmployee);

        return next();
    })
}