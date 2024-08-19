
exports.checkHeader = async (req,res,next)=>{
 
    const referer = req.headers['user-agent']
   if(referer.toLowerCase().includes('mozilla')){
    next();
   }else{
    res.send({
        massage:'karo website hack kora thik na'
    })
   }
        
        
   
  
    
}