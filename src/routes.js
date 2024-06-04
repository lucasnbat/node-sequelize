const express = require('express');

// invocando meu controller de user que usa o model User
const EmployeeController = require('./controllers/EmployeeController');

const router = express.Router();

router.get('/employees', EmployeeController.index);
router.post('/employees', EmployeeController.store);
router.put('/employees/:id_employee', EmployeeController.update);
router.delete('/employees/:id_employee', EmployeeController.delete);

// exportando minha var router
module.exports = router;