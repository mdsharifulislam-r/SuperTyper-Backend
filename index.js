const express = require('express')
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const cors = require('cors')
const Resiterrouter = require('./api/ResisterAndLogin/ResistrerAndLogin')

const ConnectDB = require('./database/connect')
const SkillRouter = require('./api/SkillApi/SkillApi')
const CokkieParser = require('cookie-parser')
const app = express()

dotenv.config()
const port = process.env.PORT || 3000
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(
  cors({
      origin:["http://localhost:5173","https://supertyper.netlify.app"],
      credentials:true
  })
);

app.use(CokkieParser());
app.get("/", (req, res) => {
    res.send("Server is Running")
    
})

app.use("/api", Resiterrouter);
app.use("/api",SkillRouter)
ConnectDB()
app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})
