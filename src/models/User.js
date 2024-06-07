const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// usamos para nos comunicar com o banco de dados
class User extends Model {
    // metodo estatico
    static init(sequelize) {
        super.init({
            idUser: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING, //adicionada no módulo de jwt
            isLogged: DataTypes.BOOLEAN, // adicionada com a migration add-column
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true, 
            createdAt: 'created_at', // mapear para a coluna created_at
            updatedAt: 'updated_at', // mapear para a coluna updated_at
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync(); //pega senha
                    user.password = bcrypt.hashSync(user.password, salt); // gera o hash
                }
            }
        })
    }
}
module.exports = User;