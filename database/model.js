const { default: mongoose } = require("mongoose");
const { Socket } = require("socket.io");


const UserSceme = mongoose.Schema({
  name: String,
  email: String,
  image: String,
  password: String,
  isSocial: Boolean,
  type: String,
  social: Array,
  following: Array,
  followers:Array,
  
});

const UserSkillScheme = mongoose.Schema({
  userId: String,
  daily: Array,
  monthly:Array,
})


const UserModel = mongoose.model("user", UserSceme)

const UserSkillModel = mongoose.model("skill", UserSkillScheme)

module.exports={UserModel,UserSkillModel}