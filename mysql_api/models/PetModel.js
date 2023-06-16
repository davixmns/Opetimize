const Sequelize = require('sequelize');
const database = require('../database/DB');
const User = require('./UserModel');

const PetModel = database.define('pet', {
    pet_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    breed: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
}, {
    timestamps: false
});

PetModel.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = PetModel;
