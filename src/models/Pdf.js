const { Model, DataTypes } = require('sequelize');
// import appConfig from '../config/appConfig';

class Pdf extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo não pode ficar vazio',
                    },
                },
            },
            filename: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo não pode ficar vazio',
                    },
                },
            },
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${appConfig.url}/pdfs/${this.getDataValue('filename')}`;
                },
            },
        }, {
            sequelize,
            tableName: 'pdfs',
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Ticket, { foreignKey: 'id_ticket' });
    }
}

module.exports = Pdf;