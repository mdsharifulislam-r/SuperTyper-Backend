const { default: mongoose } = require("mongoose");

const User = mongoose.Schema({
    img:String,
    name: String,
    email: String,
    pass: String,
    contacts:Array
})

const massage = mongoose.Schema({
    member:Array,
    massages:Array
})


const UserModel = mongoose.model("users", User)

const MassageModel= mongoose.model('massages',massage)

module.exports = { UserModel, MassageModel }