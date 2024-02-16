const { UserModel, MassageModel } = require("./model")
// User Section Start

exports.CreateUser = (req, res) => {
    UserModel.create(req.body)
        .then(data => res.send(data))
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

// Massage Section Start

exports.CreateMassage = (req, res) =>
{
  console.log('runned');
  try {
    MassageModel.create(req.body)
      .then(massage => res.send(massage))
    
  } catch (error) {
    console.log(error);
  }
  
}

exports.UpdateMassage = (req, res) =>
{
  const id = req.params.id

  try {
    MassageModel.findByIdAndUpdate(id, req.body)
      .then(data => res.send(data))
    
  } catch (error) {
    console.log(error);
  }
}
  
exports.FindMassage = (req, res) =>
{
  MassageModel.find()
    .then(data => res.send(data))
    .catch(err=>console.log(err))
}
  
//Massage Section End