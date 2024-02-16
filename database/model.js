const { default: mongoose } = require("mongoose");

const User = mongoose.Schema({
    img:String,
    name: String,
    email: String,
    phone: String,
    address: Array,
    pass:String
})
const Order = mongoose.Schema({
    order:Object
})

const Product = mongoose.Schema({
    data:Array
})
const Review = mongoose.Schema({
    product_id:String,
    reviews:Array
})
const visitor = mongoose.Schema({
    vistors: Array,
    expireDate:String
})
const UserModel = mongoose.model("users", User)
const OrderModel = mongoose.model("orders", Order)
const ProductModel = mongoose.model("products", Product)
const ReviewModel = mongoose.model("reviews", Review)
const VisitorModel = mongoose.model("visitor",visitor)
module.exports = {UserModel,OrderModel,ProductModel,ReviewModel,VisitorModel}