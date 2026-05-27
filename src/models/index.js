const sequelize = require('../config/database'); // chama o sequelize
const User = require("./user");
const Cliente = require("./clientes");

sequelize.sync(); // sincroniza o banco de dados

module.exports = { // exporta o sequelize
    sequelize,
    User,
    Cliente
};