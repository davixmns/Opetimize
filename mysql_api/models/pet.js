const Sequelize = require('sequelize');
const database = require('../database/db');
const User = require('./user');

const Pet = database.define('pet', {
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
});

Pet.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = Pet;
