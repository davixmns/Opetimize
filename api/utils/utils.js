import * as jose from "jose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const jwt_key = process.env.JWT_KEY;

export default {
    async signJWT(user_id) {
        return await new jose.SignJWT({user_id: user_id})
            .setProtectedHeader({alg: "HS256"})
            .setIssuedAt()
            .setExpirationTime("1y")
            .sign(new TextEncoder().encode(jwt_key));
    },
    emailRegex
}