import Sequelize from 'sequelize';
import database from '../database/DB.js';

const UserModel = database.define('user', {
    user_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profile_image: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

export default UserModel;