const jwt = require("jsonwebtoken")

exports.JwttokenVerify = async (req, res, next) => {
 
    try {
        const token = req.cookies.token
       
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (token) {
            if (decode) {
                next();
            } else {
               
            }
            
        } 
    } catch (error) {
        console.log(error);
    }
}
