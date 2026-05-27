const { User } = require('../models');

//get all users
exports.getAllUsers = async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    }

//post new user
exports.createUser = async (req, res) => {
        const { nome, email, senha } = req.body;
        const user = await User.create({ nome, email, senha });
        res.json(user);
    }

//delete user by id
exports.delete = async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
}

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.senha !== senha) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    res.json({
      message: 'Login realizado com sucesso',
      user
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};


