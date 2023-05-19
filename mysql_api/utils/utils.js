const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const jwt_key = process.env.JWT_KEY

module.exports = {
    createToken(user, expiresIn) {
        return jwt.sign({userId: user.user_id}, jwt_key, {expiresIn: expiresIn});
    },

    async findUserbyEmail(email) {
        const user = await UserModel.findOne(email);
        if (user) {
            return user;
        }
    },

}
