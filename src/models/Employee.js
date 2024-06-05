const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
            password: DataTypes.STRING, //adicionada no módulo de jwt
            isLogged: DataTypes.BOOLEAN,
        }, {
            sequelize,
            modelName: 'Employee',
            tableName: 'Employees',
            timestamps: true, 
            createdAt: 'created_at', // mapear para a coluna created_at
            updatedAt: 'updated_at', // mapear para a coluna updated_at
            hooks: {
                beforeCreate: (employee) => {
                    const salt = bcrypt.genSaltSync(); //pega senha
                    employee.password = bcrypt.hashSync(employee.password, salt); // gera o hash

                }
            }
        })
    }

    static associate(models) {
        this.hasMany(models.Ticket, { foreignKey: 'id_employee', as: 'tickets'  });
        this.belongsTo(models.Department, { foreignKey: 'id_department', as: 'dept' }); //mudando para evitar colisão de nomes
    }

}
module.exports = Employee;