const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const ConnectDB = require("./database/connect")
const controller= require("./database/controller")
const { default: mongoose } = require("mongoose")
const cors = require("cors")
const PORT = process.env.PORT || 3000
mongoose.Promise = global.Promise

dotenv.config()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

console.log(process.env.PORT);

ConnectDB()

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Server is Runnig")
})
app.post("/api/createuser", controller.CreateUser)
app.get("/api/getuser", controller.FindUser)
app.post("/api/createorder", controller.CreateOrder)
app.get("/api/orders", controller.FindOrder)
app.post("/api/updateuser/:id", controller.UpdateUser)
app.post("/api/updateorder/:id", controller.UpdateOrder)
app.post("/api/addproducts", controller.AddProductData)
app.get("/api/products", controller.FindProduct)
app.post("/api/updateproduct/:id", controller.UpdateProducts)
app.delete("/api/deleteorder/:id", controller.DeleteOrder)
app.post("/api/createvisitor", controller.CreateVisitor)
app.get("/api/visitors", controller.FindVisitor)
app.put("/api/update/visitor/:id",controller.UpdateVisitor)
app.listen(PORT,()=>{
    console.log(`Server is runnig on ${PORT}` );
})

