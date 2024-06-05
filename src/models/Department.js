const { Model, DataTypes } = require('sequelize');

class Department extends Model {
    static init(sequelize) {
        super.init({
            idDepartment: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            department: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'Department',
            tableName: 'departments',
            timestamps: true, // desativar timestamps automáticas })
            createdAt: 'created_at', // mapear para a coluna created_at
            updatedAt: 'updated_at', // mapear para a coluna updated_at
        })
    }

    // a foreign key da tabela de departments vai ser idDepartment
    static associate(models) {
        this.hasMany(models.Employee, {
            foreignKey: 'id_department', //nome da foreign key - usei o mesmo case dos params de url
            as: 'employees' 
        })
    }
}

module.exports = Department;