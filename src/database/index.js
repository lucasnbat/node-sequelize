// importa sequelize
const Sequelize = require('sequelize'); 

// importanddo configs do sequelize
const dbConfig = require('../config/database') 

// epga o modal User
const User = require('../models/Employee')

// cria conexão invocando a instancia de sequelize criada
// utilizando as config definidas
const connection = new Sequelize(dbConfig);

// precisa para conectar no banco
User.init(connection);

// try {
//     connection.authenticate();
//     console.log('Conexão estabelecida');
// } catch(error){
//     console.error('Impossível conectar à base de dados', error);
// }

// exporta a connexão
module.exports = connection;