const Sequelize = require('sequelize');
const database = require('../database/DB');
const User = require('./UserModel');

const PurchaseModel = database.define('purchase', {
    purchase_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

PurchaseModel.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = PurchaseModel;
