const multer = require('multer');
const { extname, resolve } = require('path');

const random = () => Math.floor(Math.random() * 10000 + 10000);

module.exports = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new multer.MulterError('Arquivo precisa ser um PDF'));
        }
        return cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', '..', 'uploads', 'pdfs'));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
        },
    }),
};
