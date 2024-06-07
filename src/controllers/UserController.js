const User = require('../models/User');

// gerando o token de sessão
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300,
    })
}

module.exports = {
    async login(req, res) {
        const { email, password, isLogged } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'e-mail ou senha incorreto!',
                employee: {}
            })
        }

        // compara a senha vinda do bod com a senha do banco (employee.password)
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                status: 0,
                message: 'e-mail ou senha incorreto!',
                user: {},
            })
        }

        // puxando idEmployee do banco e jogando pra variavel
        const id_user = user.idUser;

        // faz update no isLogged pra mostrar que tá logado
        await User.update({
            isLogged
        }, {
            where: {
                idUser: id_user,
            }
        })

        // deixa como undefined para não msotrar senha
        user.password = undefined;

        // id passado para gerar o token. deixei ele apenas como "id"
        const token = generateToken({ id: user.idUser })

        return res.status(200).send({
            status: 1,
            message: 'usuário logado com sucesso',
            user,
            token,
        })
    },

    async store(req, res) {
        const { user, email, password, isLogged } = req.body;

        const userConst = await User.create({
            user,
            email,
            password,
            isLogged
        });

        const token = generateToken({ id: userConst.idUser });

        return res.status(200).send({
            status: 1,
            message: 'usuário criado com sucesso',
            userConst,
            token,
        })
    },

    async update(req, res) {
        const { id_user } = req.params;

        const { user, email, password } = req.body;

        const userConst = await User.update({
            user,
            email,
            password
        }, {
            where: {
                idUser: id_user,
            }
        })

        return res.status(200).send({
            status: 1,
            message: 'usuário atualizado com sucesso',
            userConst,
        })
    },

    async delete(req, res) {
        const { id_user } = req.params;

        const userConst = await User.destroy({
            where: {
                idUser: id_user,
            }
        })

        return res.status(200).send({
            status: 1,
            message: 'usuário deletado com sucesso',
            userConst,
        })
    }
}


