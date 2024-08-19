
exports.checkHeader = async (req,res,next)=>{
  console.log(req.headers);
//   const blockUser = process.env.BLOCK_USER_AGENTS.split("___")
//   if(blockUser.some(data=>userAgent)){
//     res.send({
//         massage:"un Authorized"
//     })
//     return
//   }    
    next();
}