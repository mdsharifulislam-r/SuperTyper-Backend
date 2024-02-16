const express = require('express')
const { CreateMassage, FindMassage, UpdateMassage } = require('../../database/controller')

const MassageRouter = express.Router()

MassageRouter.post("/create", CreateMassage)

MassageRouter.get("/find", FindMassage)

MassageRouter.put('/update/:id', UpdateMassage)

module.exports = MassageRouter