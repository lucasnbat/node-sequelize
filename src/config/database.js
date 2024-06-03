// configurações da base de dados

// eu exporto para usar em outro arquivo

module.exports = {
    hosts: 'localhost',
    dialect: 'mysql', //banco utilizado
    username: 'coa_user',
    password: '#tecnologia#$123',
    database: 'coa_holerites', //nome do banco de dados
    define: {
        timestamps: true, // cria colunas update_at e create_at
        undescored: true, // undescored é o underline do update_at e create_at
    }
}

/**
 * usuário: coa_user;
 * senha: #tecnologia#$123
 */