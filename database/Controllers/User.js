const { HashPassword, ComparePassword } = require("../../Helper/HashPassword");
const { jwtTokemGenarator } = require("../../Helper/jwtTokenGenarator");
const { UserModel } = require("../model");

exports.CreateUser = async (req, res) => {
  try {
    const { name, email, password, image, isSocial, type } = req.body;
    if (name && email) {
      const IsExist = await UserModel.findOne({ email: email });
      
      if (!IsExist) {
        if (!isSocial) {
          if (password) {
            const hashPassword = await HashPassword(password);
        
            UserModel.create({
              name: name,
              email,
              password: hashPassword,
              image: "",
              isSocial: false,
              
            })
          
              .then(async (user) => {
                   
                res.send({
                  success: true,
                  massage: "User Resisterd Successfully",
                  id: user?._id,
                
                
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          if (name && email && type) {
            UserModel.create({
              name: name,
              email,
              image,
              password: "",
              isSocial: true,
              type,
            }).then((user) => {
              res.send({
                success: true,
                massage: "User Resisterd Successfully",
                id:user?._id
              });
            });
          } else {
          }
        }
      } else {
        res.send({
          success: false,
          massage: "Email has already exist",
        });
      }
    } else {
      res.send({
        success: false,
        massage: "Fill All field and try agin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.LoginUser = async (req, res) => {
  
  try {
    const { email, password, isSocial, type } = req.body;
  
    if (email) {
      const user = await UserModel.findOne({ email: email });
      
      if (user) {
        const token = await jwtTokemGenarator(JSON.stringify(user._id));
        if (!isSocial) {
          if (password)
          {
          const ismatch = await ComparePassword(password, user?.password);
            if (ismatch) {
              res.cookie("token", token, {
                expires: new Date(Date.now() + 5000000),
              });
              res.send({
                success: true,
                massage: "Login Successfully",
                user: {
                  _id:user?._id,
                  name: user?.name,
                  email: user?.email,
                  image: user?.image,
                },
                
              });
              
            }
          } else {
            res.send({
              success: false,
              massage: "Something is wrong",
            });
          }
        } else {
          if (type && type == user?.type) {
            res.cookie("token", token, {
              expires: new Date(Date.now() + 5000000),
            });
            res.send({
              success: true,
              massage: "Login is Successfull",
              user: user,
              
            });
          } else {
            res.send({
              success: false,
              massage:"Somethin went wrong"
            })
          }
        }
      } else {
        res.send({
          success: false,
          massage: "User not resisterd",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token")
    res.send({
      success: true,
      massage:"Logout Successfull"
    })
  } catch (error) {
    console.log(error);
  }
}

exports.UpdateUser = async (req, res) => {
  try {
    console.log("click");
    const id = req.params.id
    if (req.body && id) {
      const user = await UserModel.findByIdAndUpdate(id, req.body)
      if (user) {
        res.send({
          success: true,
          massage:"Account update successfully"
        })
      }
      else {
        res.send({
          success: false,
          massage:"Something is wrong"
        })
      }
    }
    else {
      res.send({
        success: false,
        massage:"Something is wrong"
      })
    }
    
  } catch (error) {
    console.log(error);
    
  }
}

exports.FindeOneUser = async (req, res) => {
  try {
    const id = req.params.id

    if (id) {
      const user = await UserModel.findById(id);
      if (user) {
        res.send({
          success: true,
          user: {
            _id: user._id,
            name: user?.name,
            image: user?.image,
            social: user?.social,
            email: user?.email,
            followers: user?.followers,
            following:user?.following
            
          }
        })
      } else {
        res.send({
          success: false,
          massage:"There is no account by these id"
        })
      }
    } else {
      res.send({
        success: false,
        massage:"Please Provide Id"
      })
    }
  } catch (error) {
    console.log(error);
  }
  
  
}

exports.UpdateFollowers = async (req,res) => {

  try {
    const id = req.params.id 
    if (id) {
     
        const user = await UserModel.findById(id.toString())
      if (user) {
          
        if (req.body.type == "followers") {
          const IsExist = user?.followers?.some(data => data == req.body.id)
          
          if (!IsExist) {
            const data = {
              name: user?.name,
              email: user?.email,
              image: user?.image,
              password: user?.password,
              isSocial: user?.isSocial,
              social: user?.social,
              following: user?.following,
              followers: user?.followers ? [...user?.followers, req.body.id] : [req.body.id]
            }
          
            const upuser = await UserModel.findByIdAndUpdate(id, data)
            res.send({
              success: true,
              massage:"follower Added Successfully"
            })
          } else {
            res.send({
              success: false,
              massage:"follower already exist"
            })
          }
            
        } else if (req.body.type == "following") {
            const IsExist = user?.following?.some(
              (data) => data == req.body.id
            );
console.log(req.body.type);
            if (!IsExist) {
              const data = {
                name: user?.name,
                email: user?.email,
                image: user?.image,
                password: user?.password,
                isSocial: user?.isSocial,
                social: user?.social,
                followers: user?.followers,
                following: user?.following
                  ? [...user?.following, req.body.id]
                  : [req.body.id],
              };
              
              const upuser = await UserModel.findByIdAndUpdate(id, data);
              res.send({
                success: true,
                massage: "following Added Successfully",
              });
            } else {
              res.send({
                success: false,
                massage: "follower already exist",
              });
            }
            
        } else if (req.body.type === "unfollow") {
        
     

       
            const user2 = await UserModel.findById(req.body.id.toString());
            const data2 = {
              name: user2?.name,
              email: user2?.email,
              image: user2?.image,
              password: user2?.password,
              isSocial: user2?.isSocial,
              social: user2?.social,
              following: user2?.following,
              followers:user2?.followers?.filter((data) => data !== id),
          };
          console.log(user2);
               const data = {
                 name: user?.name,
                 email: user?.email,
                 image: user?.image,
                 password: user?.password,
                 isSocial: user?.isSocial,
                 social: user?.social,
                 followers: user?.followers,
                 following: user?.following?.filter(data=>data !== req.body.id),
            };
            
              const upuser2 = await UserModel.findByIdAndUpdate(req.body.id, data2);
               const upuser = await UserModel.findByIdAndUpdate(id, data);
               res.send({
                 success: true,
                 massage: "following Added Successfully",
               });
            
          }
        } else {
          res.send({
            success: false,
            massage:"User not found"
          })
        }
      
    } else {
      res.send({
        success: false,
        massage:"please provid"
      })
    }
  } catch (error) {
    console.log(error);
  }
}