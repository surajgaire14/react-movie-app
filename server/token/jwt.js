const {sign,verify} = require("jsonwebtoken")

const createTokens = (user) => {
    const accessToken = sign({
        username:user.username,id:user.id,
    },"mySecretKeyForMyMovieApp")
    return accessToken
}

const validateToken = (req,res,next) => {
    const token = req.cookies["access-token"]
    if(!token){
        return res.status(400).json({error:"User not authenticated..."})
    }
    try{
        const validToken = verify(token,"mySecretKeyForMyMovieApp")
        if(validToken){
            req.auth = true
            return next()
        }
    }catch(err){
        return res.status(400).json({error:err})
    }
}

module.exports = {createTokens,validateToken}