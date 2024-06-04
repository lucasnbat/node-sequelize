const { Model, DataTypes } = require('sequelize');

// usamos para nos comunicar com o banco de dados
class Employee extends Model {
    // metodo estatico
    static init(sequelize) {
        super.init({
            idEmployee: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            // não precisa de id, created e updated aqui
            // você não passa eles ao inserir
            employee: DataTypes.STRING,
            department: DataTypes.STRING, // está "setor" lá no front
            email: DataTypes.STRING,
            isLogged: DataTypes.BOOLEAN,
        }, {
            sequelize,
            modelName: 'Employee',
            tableName: 'Employees',
            timestamps: true, // desativar timestamps automáticas })
            createdAt: 'created_at', // mapear para a coluna created_at
            updatedAt: 'updated_at', // mapear para a coluna updated_at
        })
    }
}
module.exports = Employee;