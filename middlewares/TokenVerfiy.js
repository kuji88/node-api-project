const jwt = require("jsonwebtoken")


const tokenVerfiy = (req,res,next)=>{
    const token = req.headers.token
    
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.jwtsecret)
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({message: "tokne is wrong"})
        }
    }
    else{
        res.status(401).json({message:"Token not found"})
    }
}

const tokenVandcheck =(req,res,next)=>{
    tokenVerfiy(req,res,()=>{
        if(req.user.id === req.params.id){
            
            next()
         }
         else{
            return res.status(403).json({message:"you are not allowed to change"})
         }
    })
    
}

module.exports={tokenVerfiy,tokenVandcheck}