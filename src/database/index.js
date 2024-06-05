// importa sequelize
const Sequelize = require('sequelize'); 

// importanddo configs do sequelize
const dbConfig = require('../config/database') 

// epga o modal User
const Employee = require('../models/Employee');
const Ticket = require('../models/Ticket');
const Department = require('../models/Department');

// cria conexão invocando a instancia de sequelize criada
// utilizando as config definidas
const connection = new Sequelize(dbConfig);

// precisa para conectar no banco
Employee.init(connection);
Ticket.init(connection);
Department.init(connection);

// associa os models para fazer o relacionamento
Employee.associate(connection.models);
Ticket.associate(connection.models);
Department.associate(connection.models);


// exporta a connexão
module.exports = connection;