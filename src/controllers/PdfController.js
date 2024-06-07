const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const Pdf = require('../models/Pdf');
const Ticket = require('../models/Ticket');

const upload = multer(multerConfig).single('pdf');

module.exports = {
    store(req, res) {
        return upload(req, res, async (error) => {
            if (error) {
                return res.status(400).json({
                    errors: [error.code],
                });
            }
            try {
                const { originalname, filename } = req.file;
                const { id_ticket } = req.params;

                const ticket = await Ticket.findByPk(id_ticket);

                if (!ticket) {
                    return res.status(400).json({
                        status: 0,
                        message: 'Ticket não encontrado',
                    });
                }

                // Se já existir um PDF associado ao ticket, substituí-lo
                const existingPdf = await Pdf.findOne({ where: { id_ticket } });
                if (existingPdf) {
                    await existingPdf.destroy();
                }

                const pdf = await Pdf.create({ originalname, filename, id_ticket });

                return res.json(pdf);
            } catch (e) {
                return res.status(400).json({
                    errors: ['Erro ao processar PDF'],
                });
            }
        });
    },
    async show(req, res) {
        try {
            const { id_ticket } = req.params;
            const pdf = await Pdf.findOne({ where: { id_ticket } });

            if (!pdf) {
                return res.status(400).json({
                    status: 0,
                    message: 'PDF não encontrado',
                });
            }

            return res.json(pdf);
        } catch (e) {
            return res.status(400).json({
                errors: ['Erro ao buscar PDF'],
            });
        }
    }
}