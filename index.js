const express = require("express")
const app = express()
const http = require('http').createServer(app)
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const ConnectDB = require("./database/connect")
const controller= require("./database/controller")
const { default: mongoose } = require("mongoose")
const cors = require("cors")
const { Socket, Server } = require("socket.io")
const Router = require("./Routes/Router")
const { log } = require("console")
const { send } = require("process")
const MassageRouter = require("./Routes/MassageRoutes/MassageRoutes")
const PORT = process.env.PORT || 3000
mongoose.Promise = global.Promise
const io = new Server(http, {
  cors: {
    origin:"*"
  }
})

dotenv.config()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
ConnectDB();

app.use(cors())
let users =[]
io.on("connect", (socket) => {
  
  console.log(`User is connected on ${socket.id}`);
  socket.on('send-user', (user) => {
    const found = users.some(data => data._id === user._id)
    if (found) {
      const index = users.findIndex((data) => data._id === user._id);
      users[index] = {
        ...user,
        room: socket.id
      }
    }
    else {
      users.push({
        ...user,
        room: socket.id
      
      })
    }
    io.emit("get-users", users);
  })
  socket.on('send-massage', (massage,room) => {
   try {
     if (room)
     {
        io.to(room).emit("receved-massage", massage);
     }
   
   } catch (error) {
    console.log(error);
    }
  
    
  })
   socket.on("send-call", (room, payload) => {
     
     io.to(room).emit("incomming-call", payload);
   });
  socket.on("reject-call", (room, massage) => {
     io.to(room).emit('reject-call',massage)
   })
  
  // socket.on("sendUser", (user) => {
  //   if (user)
  //   {
  //     users[user._id]=socket.id
  //     }
  // })
  socket.on('getUsers', (massage) => {
   console.log('calling');
    io.emit("get-users", users);
  })
  io.on("disconnect", (socket) => {
    console.log(`disconnect ${socket.id}`);
 })
  io.emit("activeUser", users)
  socket.on("disconnect", () => {
    console.log(`user Logout`);
    users = users.filter(data => data.room !== socket.id)
    io.emit("get-users", users);
  
  })
  
})

app.use("/api/user/", Router)

app.use('/api/massage/',MassageRouter)
http.listen(3000, () => {
  console.log('server is running');
})


