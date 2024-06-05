// importa sequelize
const Sequelize = require('sequelize'); 

// importanddo configs do sequelize
const dbConfig = require('../config/database') 

// epga o modal User
const User = require('../models/Employee');
const Ticket = require('../models/Ticket');

// cria conexão invocando a instancia de sequelize criada
// utilizando as config definidas
const connection = new Sequelize(dbConfig);

// precisa para conectar no banco
User.init(connection);
Ticket.init(connection);

// exporta a connexão
module.exports = connection;