const { Model, DataTypes } = require('sequelize');

class Ticket extends Model {
    static init(sequelize) {
        super.init({
            idTicket: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            obs: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            month: DataTypes.INTEGER,
        }, {
            sequelize,
            modelName: 'Ticket',
            tableName: 'tickets',
            timestamps: true, // desativar timestamps automáticas })
            createdAt: 'created_at', // mapear para a coluna created_at
            updatedAt: 'updated_at', // mapear para a coluna updated_at
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