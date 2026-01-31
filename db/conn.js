const { Sequelize } = require("sequelize")
const path = require('path');
require('dotenv').config({ quiet: true });
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
})

sequelize.authenticate().then(() => {
    console.log("Banco de dados conectado")
}).catch(err => {
    console.log(`Erro ao conectar ao banco de dados. Erro: ${err}`)
})


module.exports = {
    sequelize, Sequelize
}