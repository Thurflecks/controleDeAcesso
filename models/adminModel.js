const { Sequelize, sequelize } = require('../db/conn');

const AdminModel = sequelize.define("admin", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nivel: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'admin',
    timestamps: false,
});

module.exports = AdminModel;