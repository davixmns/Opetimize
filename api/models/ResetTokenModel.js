import Sequelize from "sequelize";
import database from "../database/DB.js"

const ResetTokenModel = database.define("reset_token", {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id',
        }
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
})

export default ResetTokenModel;