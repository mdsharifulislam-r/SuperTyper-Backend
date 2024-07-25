const { getAvarage } = require("../../../Helper/getAarage");
const { getTitle } = require("../../../Helper/getTitle");
const { jwtTokemGenarator } = require("../../../Helper/jwtTokenGenarator");
const { UserSkillModel, UserModel } = require("../../model");

exports.CreateSkill = async (req, res) => {
  try {
    console.log("called");
    const { userId, daily, monthly } = req.body;
    if (userId) {
      const data = await UserSkillModel.findOne({ userId: userId });
     
      if (!data) {
        UserSkillModel.create({
          userId: userId,
          daily: daily,
          monthly: [],
        }).then((data) => {
          res.send({
            success: true,
            massage: "skill create successfully",
          });
        });
      } else {
        const obj = {
          userId: userId,
          daily: daily ? [...data.daily, ...daily] : [...data.daily],
          monthly: monthly ? [...data.monthly, ...monthly] : [...data.monthly],
        };

        const id = data?._id.toString();
        UserSkillModel.findByIdAndUpdate(id, obj)
          .then((data) => {
            res.send({
              success: true,
              massage: "Successfull",
            });
          })
          .catch((err) => console.log(err));
      }
    } else {
      res.send({
        success: false,
        massage: "data already already exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.UserSkillOne = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const data = await UserSkillModel.findOne({ userId: userId });
      res.send({
        success: true,
        massage: "Successfull",
        data: data,
      });
    } else {
      res.send({
        success: false,
        massage: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.FindUsersSkill = async (req, res) => {
  try {
    const userSkill = await UserSkillModel.find();
    const newData = await userSkill.map((data) => {
      try {
          return {
            userId:data.userId,
          avarage: getAvarage(data?.daily),
        };
      } catch (error) {
        console.log(error);
      }
    });
      const users = await UserModel.find()
      const finalArr = await newData?.map( item => {
          try {
              const user = users?.filter(data => data._id == item.userId)[0]
              
    
                return {
                  avarage: item?.avarage,
                  userId:item?.userId,
                  userName: user?.name,
                  userImage: user?.image || "",
                  followers: user?.followers,
                  following:user?.following,
                  title: getTitle(item?.avarage?.wpm),
                };
            
                  
              
          } catch (error) {
            
          }
      })
    res.send({
      success: true,
      data:finalArr
     })
  } catch (error) {
    console.log(error);
  }
};
