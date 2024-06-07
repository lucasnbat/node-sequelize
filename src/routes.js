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
const PdfController = require('./controllers/PdfController');

const authMiddleware = require('./middlewares/auth');

const router = express.Router();

// login
//router.post('/employees/login', EmployeeController.login);
router.post('/users/login', UserController.login);

// employee
router.get('/employees', authMiddleware, EmployeeController.index);
router.post('/employees', authMiddleware, EmployeeController.store);
router.put('/employees/:id_employee', authMiddleware, EmployeeController.update);
router.delete('/employees/:id_employee', authMiddleware, EmployeeController.delete);

//router.use(authMiddleware);

// ticket
router.get('/tickets/:id_employee', authMiddleware, TicketController.index);
router.get('/tickets', authMiddleware, TicketController.indexAll);
router.post('/tickets/:id_employee', authMiddleware, TicketController.store);
router.put('/tickets/:id_ticket', authMiddleware, TicketController.update); //estrnaho ter usado id e não id_employee...naõ seguiu padrão
router.delete('/tickets/:id_ticket', authMiddleware, TicketController.delete);

// department

router.get('/departments', authMiddleware, DepartmentController.index);
router.post('/departments', authMiddleware, DepartmentController.store);
router.put('/departments/:id_department', authMiddleware, DepartmentController.update);
router.delete('/departments/:id_department', authMiddleware, DepartmentController.delete);

// users

router.post('/users', UserController.store);
router.put('/users/:id_user', authMiddleware, UserController.update);
router.delete('/users/:id_user', authMiddleware, authMiddleware,UserController.delete);

//pdfs

router.post('/pdfs/:id_ticket', authMiddleware, PdfController.store);
router.get('/pdfs/:id_ticket', authMiddleware, PdfController.show);

// exportando minha var router
module.exports = router;