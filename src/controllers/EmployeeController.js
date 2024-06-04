// aqui vao os metodos de gravar, selecionar, update e delete
const { where } = require('sequelize');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs'); //isso faz parte de encriptação e validação de senha
const authConfig = require('../config/auth.json'); //isso é a secret para trabalharmos com autenticação de sessão por token 
const jwt = require('jsonwebtoken');

// gerando o token de sessão
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300,
    })
}

module.exports = {
    async login(req, res) {
        const { email, password, isLogged } = req.body;

        const employee = await Employee.findOne({ where: { email } });

        if (!employee) {
            return res.status(400).send({
                status: 0,
                message: 'e-mail ou senha incorreto!',
                employee: {}
            })
        }

        // compara a senha vinda do bod com a senha do banco (employee.password)
        if (!bcrypt.compareSync(password, employee.password)) {
            return res.status(400).send({
                status: 0,
                message: 'e-mail ou senha incorreto!',
                user: {},
            })
        }

        // puxando idEmployee do banco e jogando pra variavel
        const id_employee = employee.idEmployee;

        await Employee.update({
            isLogged
        }, {
            where: {
                idEmployee: id_employee,
            }
        })

        // deixa como undefined para não msotrar senha
        employee.password = undefined;

        // id passado para gerar o token. deixei ele apenas como "id"
        const token = generateToken({ id: employee.idEmployee })

        return res.status(200).send({
            status: 1,
            message: 'funcionário logado com sucesso',
            employee,
            token,
        })
    },

    async index(req, res) {
        const employees = await Employee.findAll({
            attributes: [
                'idEmployee',
                'employee',
                'department',
                'email',
                'password',
            ],
        });

        if (employees == '' || employees == null) {
            return res.status(200).send({ message: 'nenhum funcionário cadastrado' });
        }

        return res.status(200).send({ employees })
    },

    async store(req, res) {
        const { employee, department, email, password } = req.body;

        const employeeConst = await Employee.create({
            employee,
            department,
            email,
            password,
        })

        const token = generateToken({ id: employee.idEmployee })

        return res.status(200).send({
            status: 1,
            message: 'funcionário cadastrado com sucesso!',
            employeeConst,
            token,
        })
    },

    async update(req, res) {
        const { employee, department, email, password } = req.body;

        const { id_employee } = req.params; //extrai o parametro (o mesmo de lá da routes.js)

        await Employee.update(
            {
                employee,
                department,
                email,
                password,
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
        const { id_employee } = req.params;

        await Employee.destroy({
            where: {
                idEmployee: id_employee,
            }
        })

        return res.status(200).send({
            status: 1,
            message: 'funcionário deletado com sucesso!',
        })
    },
}