const { UserModel, OrderModel, ProductModel, ReviewModel, VisitorModel } = require("./model")
// User Section Start

exports.CreateUser = (req, res) => {
    UserModel.create(req.body)
        .then(data => res.send(req.body))
        .catch(err=>console.log(err))
}
exports.UpdateUser = (req, res) =>
{
    const id = req.params.id
    UserModel.findByIdAndUpdate(id, req.body)
        .then(data => res.send(data))
        .catch(err=>console.log(err))
}
exports.FindUser = (req, res) => {
  UserModel.find().then((data) => res.send(data));
};

// User Section End

// Order Section Start

exports.FindOrder = (req, res) => {
    OrderModel.find()
        .then(data => res.send(data))
        .catch(err=>console.log(err))
}

exports.CreateOrder = (req, res) =>
{
    OrderModel.create({order:req.body})
        .then(data => res.send(data))
        .catch(err=>console.log(err))
}
exports.UpdateOrder = (req, res) => {
    const id = req.params.id
    OrderModel.findByIdAndUpdate(id, req.body)
    .then(data=>res.send(data))
}

exports.DeleteOrder = (req, res) =>
{
    const id = req.params.id
    OrderModel.findByIdAndDelete(id)
    .then(data=>res.send(data))
}


// Order Section End

//Product Section Start

exports.AddProductData = (req, res) => {
    ProductModel.create(req.body)
        .then(data=>res.send(data))
}
exports.FindProduct = (req,res) =>
{
    ProductModel.find()
        .then(data => res.send(data))
        .catch(err=>console.log(err))
}
    
//Product Section End

//Review Section Start
exports.UpdateProducts = (req, res) =>
{
    const id = req.params.id
    ProductModel.findByIdAndUpdate(id, req.body)
        .then(data=>res.send(data))
}    
// Revire Section End

//Visitor Section Start
exports.CreateVisitor = (req, res) => {
    VisitorModel.create({
        visitors: req.body.visitor,
        expireDate:req.body.expireDate
    })
        .then(data=>res.send(data))
}
exports.UpdateVisitor = (req, res) =>
{
    const id = req.params.id
    VisitorModel.findByIdAndUpdate(id, req.body)
        .then(data=>res.send(data))
}
exports.FindVisitor = (req, res) => {
    VisitorModel.find()
        .then(visitor=>res.send(visitor))
}

//Visitor Section End