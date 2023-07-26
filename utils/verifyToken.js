const jwt = require('jsonwebtoken')

const verifyToken = (token)=>{
    return (token, 'anyKey' , (err,decoded)=>{
        if(err){
          return {
            msg: "invalid Token"
          }   
        }
        else {
            return decoded
        }
    })
}

module.exports = verifyToken