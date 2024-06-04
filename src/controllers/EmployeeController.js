// aqui vao os metodos de gravar, selecionar, update e delete

const { where } = require('sequelize');
const Employee = require('../models/Employee');

module.exports = {
    async index(req, res) {
        const employees = await Employee.findAll({
            attributes: [
                'idEmployee',
                'employee',
                'department',
                'email',
            ],
        });

        if (employees == '' || employees == null) {
            return res.status(200).send({ message: 'nenhum funcionário cadastrado' });
        }

        return res.status(200).send({ employees })
    },

    async store(req, res) {
        const { employee, department, email } = req.body;

        const employeeConst = await Employee.create({
            employee,
            department,
            email
        })

        return res.status(200).send({
            status: 1,
            message: 'funcionário cadastrado com sucesso!',
            employeeConst
        })
    },

    async update(req, res) {
        const { employee, department, email } = req.body;

        const { id_employee } = req.params; //extrai o parametro

        await Employee.update(
            {
                employee,
                department,
                email,
            },
            {
                where: {
                    idEmployee: id_employee,
                }
            }
        )

        return res.status(200).send({
            status: 1,
            message: 'funcionário atualizado com sucesso!',
        })
    },

    async delete(req, res) {

    },
}