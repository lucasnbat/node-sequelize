const { Model, DataTypes } = require('sequelize');

class Ticket extends Model {
    static init(sequelize) {
        super.init({
            obs: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }

    // a foreign key da tabela de tickets vai ser idEmployee
    static associate(models) {
        this.belongsTo(models.Employee, {
            foreignKey: 'id_employee', //nome da foreign key - usei o mesmo case dos params de url
            as: 'employee' 
        })
    }
}

module.exports = Ticket;