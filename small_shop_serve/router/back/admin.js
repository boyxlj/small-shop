const adminRouter = require("express")()
const query = require("../../util/mysql2")
const jwt = require("../../util/jst")
//管理员登录
adminRouter.post("/login",(req,res)=>{
  const {username,password} = req.body
  const sql1 = `select * from admin where username = '${username}'`
  const sql2 = `select * from admin where username = '${username}' and password = '${password}'`
  query(sql1,async(result1)=>{
    if(!result1.length) return res.send({code:400,msg:"该账号未进行注册"})
    query(sql2,async(result2)=>{
      if(!result2.length) return res.send({code:404,msg:"密码错误"})
      const token = jwt.setToken({username,password},"1d")
      res.header("authorization",token)
      res.header("Access-Control-Expose-Headers","authorization")
      res.send({code:200,msg:"登录成功",token,secret:result2[0]?.secret})
    })
  })
  
})


module.exports = adminRouter