const express = require("express")
const { CreateSkill, UserSkill, UserSkillOne, FindUsersSkill } = require("../../database/Controllers/UserSkillController/UserSkillController")
const { JwttokenVerify } = require("../../Middlewares/JwttokenVerify")
const { checkHeader } = require("../../Middlewares/CheckHeader")

const SkillRouter = express.Router()

SkillRouter.post("/skill/create",checkHeader,CreateSkill)

SkillRouter.put("/skill/:id",UserSkillOne)

SkillRouter.get("/skill/data", FindUsersSkill)
module.exports = SkillRouter