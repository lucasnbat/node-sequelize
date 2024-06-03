// importa sequelize
const Sequelize = require('sequelize'); 

// importanddo configs do sequelize
const dbConfig = require('../config/database') 

// cria conexão invocando a instancia de sequelize criada
// utilizando as config definidas
const connection = new Sequelize(dbConfig);

try {
    connection.authenticate();
    console.log('Conexão estabelecida');
} catch(error){
    console.error('Impossível conectar à base de dados', error);
}

// exporta a connexão
module.exports = connection;