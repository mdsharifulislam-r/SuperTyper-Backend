const mongoose = require("mongoose")
const dotenv = require("dotenv")
const PORT = process.env.MONGODB_PORT
dotenv.config()

const ConnectDB = async ()=>{
    try{
    const con = await mongoose.connect(
      "mongodb+srv://masom3456:MasomRana456@cluster0.gk9hloq.mongodb.net/SuperTyper?retryWrites=true&w=majority"
    );
    console.log(`Database connected on ${con.connection.host}`);
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = ConnectDB