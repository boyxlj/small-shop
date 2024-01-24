const useRouter = require("express")()
const query = require("../../util/mysql2")
const JWT = require("../../util/jst")

//用户登录
useRouter.post("/login",(req,res)=>{
  const {username,password} = req.body
  const sql1 = `select * from user where username = "${username}"`
  const sql2 = `select * from user where username = "${username}" and password = "${password}"`
  query(sql1,(result1)=>{
    if(!result1.length) return res.send({code:403,msg:"账号不存在"})
    query(sql2,(result2)=>{
      if(!result2.length) return res.send({code:404,msg:"账号或密码错误"})
      result2.map(item=> delete item.password)
      const token = JWT.setToken({username,password},"1d")
      res.send({code:200,msg:"登录成功",data:result2,token})
    })
  })
})


//注册账号
useRouter.post("/register",async(req,res)=>{
  const {username,password,name} = req.body
  const sql1 = `select * from user where username = "${username}"`
  const sql2 = `insert into user(username,password,name) values("${username}","${password}","${name}")`
   query(sql1,(result1)=>{
    if(result1.length) return res.send({code:403,msg:"账号已存在"})
    query(sql2,(result2)=>{
      if(!result2) return res.send({code:404,msg:"注册失败"})
      res.send({code:200,msg:"注册成功"})
    })
  })
})


//查询所有用户
useRouter.get("/allUser",async(req,res)=>{
  const sql = "select * from user where userId = '4'"
  query(sql,(result)=>{
    if(!result.length) return res.send({code:404,msg:"查询失败"})
    res.send({code:200,msg:"查询成功",data:result})
  })
})


// //查询所有用户
// useRouter.get("/allUser1",async(req,res)=>{
//   const sql = "select * from user where userId = '5'"
//   query(sql,(result)=>{
//     if(!result.length) return res.send({code:404,msg:"查询失败"})
//     res.send({code:200,msg:"查询成功",data:result})
//   })
// })


//修改用户信息
useRouter.post("/update/userInfo",async(req,res)=>{
  let {userId,name,sex} = req.body
  if(!sex) sex = '1'
  const sql =`update user set name = "${name}",sex = "${sex}" where userId = '${userId}'`
  const sql1 = `select * from user where userId = "${userId}"` 
  query(sql,(result)=>{
    if(result==false) return res.send({code:404,msg:"修改失败"})
    query(sql1,(result)=>{
      if(!result.length) return res.send({code:404,msg:"修改失败"})
      result.map(item=> delete item.password)
      res.send({code:200,msg:"修改成功",data:result})
    })
  })
})

module.exports = useRouter