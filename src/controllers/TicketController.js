const Employee = require('../models/Employee');
const Ticket = require('../models/Ticket');

module.exports = {
    async index(req, res) {
        const { id_employee } = req.params;

        const employee = await Employee.findByPk(id_employee, {
            include: {
                association: 'tickets' //qual tabela está associada? tickets
            }
        });

        if (!employee) {
            return res.status(400).send({
                status: 0,
                message: 'nenhum ticket encontrado em nome desse funcionário'
            })
        }

        return res.status(200).send(employee.tickets)
    },

    async store(req, res) {
        try {
            const { id_employee } = req.params;
            const { obs, status } = req.body;

            const employee = await Employee.findByPk(id_employee)

            if (!employee) {
                return res.status(400).json({
                    status: 0,
                    message: 'funcionário não encontrado',
                })
            }

            const ticket = await Ticket.create({
                obs,
                status,
                id_employee,
            })

            return res.status(200).json({
                status: 1,
                message: 'Ticket criado com sucesso!',
                ticket
            })
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },

    async delete(req, res) {
        // id = id do ticket
        const id = req.params.id;

        try {
            const ticket = await Ticket.findByPk(id);

            if (ticket) {
                await Ticket.destroy({ where: { id } })

                return res.status(200).json({
                    status: 1,
                    message: 'Ticket apagado com sucesso!'
                })
            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'ticket não encontrado!'
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 0,
                message: 'ticket não encontrado!'
            })
        }
    },

    // criado por copilot 
    async update(req, res){
        const { id } = req.params;
        const { obs, status } = req.body;

        try {
            const ticket = await Ticket.findByPk(id);

            if (ticket) {
                await Ticket.update({ obs, status }, { where: { id } })

                return res.status(200).json({
                    status: 1,
                    message: 'Ticket atualizado com sucesso!'
                })
            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'ticket não encontrado!'
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 0,
                message: 'ticket não encontrado!'
            })
        }
    }

}

/**
 * criar a tabela de tickets e validar as informações funcionario + ticket (id do ticket precisa estar na tabela)
 */