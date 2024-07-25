const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
async function HashPassword(password) {
    try {
        const salt =  10;
        const gensalt =await bcrypt.genSalt(salt)
        const pass = await bcrypt.hash(password,salt)
      
        return pass
    } catch (error) {
        console.log(error);
    }
    
}

async function ComparePassword(password,hashPassword){
    return await bcrypt.compare(password,hashPassword)
}

module.exports = {HashPassword,ComparePassword}