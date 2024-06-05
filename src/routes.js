/**
 * Se quiser colocar middleware de autenticação,
 * (fechar rotas) pode só instanciar aqui e colocar
 * no meio das rotas
 */

const express = require('express');

// invocando meu controller de user que usa o model User
const EmployeeController = require('./controllers/EmployeeController');
const TicketController = require('./controllers/TicketController');

// const authMiddleware = require('./middlewares/auth');

const router = express.Router();

// employee
router.get('/employees', /*authMiddleware*/ EmployeeController.index);
router.post('/employees', EmployeeController.store);
router.put('/employees/:id_employee', EmployeeController.update);
router.delete('/employees/:id_employee', EmployeeController.delete);

// login
router.post('/employees/login', EmployeeController.login);

//router.use(authMiddleware);
// ticket
router.get('/employees/:id_employee/tickets', TicketController.index);
router.post('/employees/:id_employee/tickets', TicketController.store);
router.put('/employees/:id/tickets', TicketController.update); //estrnaho ter usado id e não id_employee...naõ seguiu padrão
router.delete('/employees/:id/tickets', TicketController.delete);

// exportando minha var router
module.exports = router;