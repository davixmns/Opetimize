const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const jwt_key = process.env.JWT_KEY

module.exports = {
    createToken(user, expiresIn) {
        return jwt.sign({userId: user.user_id}, jwt_key, {expiresIn: expiresIn});
    },

    async findUserbyEmail(email) {
        try {
            return await UserModel.findOne({where: {email: email}});
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

}
