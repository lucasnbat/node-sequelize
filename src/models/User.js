const {Model, DataTypes} = require('sequelize');

// usamos para nos comunicar com o banco de dados
class User extends Model {
    // metodo estatico
    static init (sequelize) {
        super.init({
            // não precisa de id, created e updated aqui
            // você não passa eles ao inserir
            employee: DataTypes.STRING,
            department: DataTypes.STRING, // está "setor" lá no front
            email: DataTypes.STRING,
        })
    }
}