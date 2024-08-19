const express = require("express")
const { CreateUser, LoginUser, LogoutUser, UpdateUser, FindeOneUser, UpdateFollowers } = require("../../database/Controllers/User")
const { jwtTokemGenarator } = require("../../Helper/jwtTokenGenarator")
const { JwttokenVerify } = require("../../Middlewares/JwttokenVerify")
const { checkHeader } = require("../../Middlewares/CheckHeader")


const Resiterrouter = express.Router()
Resiterrouter.post("/user/create", checkHeader, CreateUser)
Resiterrouter.post("/user/login",LoginUser)
Resiterrouter.post("/user/logout", LogoutUser)
Resiterrouter.put("/user/update/:id", UpdateUser)
Resiterrouter.get("/user/:id", FindeOneUser)
Resiterrouter.put("/user/followers/:id",checkHeader, UpdateFollowers)
module.exports= Resiterrouter