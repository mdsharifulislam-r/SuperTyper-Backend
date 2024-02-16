const express = require('express')
const { CreateUser, FindUser, UpdateUser } = require('../database/controller')
const Router = express.Router()

Router.post("/create", CreateUser)
Router.get("/find", FindUser)
Router.put('/update/:id',UpdateUser)
module.exports=Router