const Department = require('../models/Department');

module.exports = {
    async index(req, res) {
        try {
            const departments = await Department.findAll({
                attributes: ['idDepartment', 'department'],
            });
            return res.json(departments);
        } catch (error) {
            return res.status(400).send({ error: 'Erro ao listar departamentos', error });
        }

    },

    async store(req, res) {

        try {
            const { department } = req.body;
            const departmentConst = await Department.create({ department });
            return res.json(departmentConst);
        } catch (error) {
            return res.status(400).send({ error: 'Erro ao cadastrar departamento', error });
        }
    },

    async update(req, res) {
        try {
            const { id_department } = req.params;
            const { department } = req.body;
            const departmentConst = await Department.findByPk(id_department);
            departmentConst.department = department;
            await departmentConst.save();
            return res.json(departmentConst);
        } catch (error) {
            return res.status(400).send({ error: 'Erro ao atualizar departamento', error });
        }

    },

    async delete(req, res) {

        try {
            const { id_department } = req.params;
            const departmentConst = await Department.findByPk(id_department);
            await departmentConst.destroy();
            return res.json(departmentConst);
        } catch (error) {
            return res.status(400).send({ error: 'Erro ao deletar departamento', error });
        }

    }
}