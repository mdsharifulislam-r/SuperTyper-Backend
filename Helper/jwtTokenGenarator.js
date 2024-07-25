const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
exports.jwtTokemGenarator = async (id) => {
    try {
        const key = process.env.JWT_SECRET
        return await JWT.sign({ _id: id }, key, {
            expiresIn:"7d"
        })
    } catch (error) {
        console.log(error);
    }
}
