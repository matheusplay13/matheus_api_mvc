const { Cliente } = require('../models');

//get all clientes
exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
    }
}

//get cliente by id
exports.getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
    }
}

//post new cliente
exports.createCliente = async (req, res) => {
    try {
        const { razao_social, cnpj } = req.body;
        const cliente = await Cliente.create({ razao_social, cnpj });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
    }
}

//update cliente
exports.updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { razao_social, cnpj } = req.body;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        await cliente.update({ razao_social, cnpj });
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
    }
}

//delete cliente by id
exports.deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        await cliente.destroy();
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
    }
}
