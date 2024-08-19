
exports.checkHeader = async (req,res,next)=>{
 
    const referer = req.headers['origin']
    console.log(origin);
    if(referer && referer=="https://supertyper.netlify.app"){
        
        next();
    }
  
    res.send({
        massage:"Arek Joner website hack kora thik na"
    })
}