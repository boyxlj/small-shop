const secret = "hello world"
const jwt = require("jsonwebtoken")
const JWT = {
  setToken:(option,timer)=>{
    return jwt.sign(option,secret,{expiresIn:timer})
  },
  verifyToken:(token)=>{
    try {
      return jwt.verify(token,secret)
    } catch (error) {
      return false
    }
  }
}

module.exports = JWT