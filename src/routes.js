/**
 * Se quiser colocar middleware de autenticação,
 * (fechar rotas) pode só instanciar aqui e colocar
 * no meio das rotas
 */

const express = require('express');

// invocando meu controller de user que usa o model User
const EmployeeController = require('./controllers/EmployeeController');
const TicketController = require('./controllers/TicketController');
const DepartmentController = require('./controllers/DepartmentController');
const UserController = require('./controllers/UserController');

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
router.get('/tickets/:id_employee', TicketController.index);
router.get('/tickets', TicketController.indexAll);
router.post('/tickets/:id_employee', TicketController.store);
router.put('/tickets/:id_ticket', TicketController.update); //estrnaho ter usado id e não id_employee...naõ seguiu padrão
router.delete('/tickets/:id_ticket', TicketController.delete);

// department

router.get('/departments', DepartmentController.index);
router.post('/departments', DepartmentController.store);
router.put('/departments/:id_department', DepartmentController.update);
router.delete('/departments/:id_department', DepartmentController.delete);

// users

router.post('/users', UserController.store);
router.put('/users/:id_user', UserController.update);
router.delete('/users/:id_user', UserController.delete);

// exportando minha var router
module.exports = router;