
exports.checkHeader = async (req,res,next)=>{
 
    const referer = req.headers['referer']

    if(referer && referer=="https://supertyper.netlify.app/"){
        
        next();
    }
  
    res.send({
        massage:"Arek Joner website hack kora thik na"
    })
}