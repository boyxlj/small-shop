const useRouter = require("express")()
const query = require("../../util/mysql2")
const JWT = require("../../util/jst")

// //管理登录
// useRouter.post("/login",(req,res)=>{
//   const {username,password} = req.body
//   const sql1 = `select * from user where username = "${username}"`
//   const sql2 = `select * from user where username = "${username}" and password = "${password}"`
//   query(sql1,(result1)=>{
//     if(!result1.length) return res.send({code:403,msg:"账号不存在"})
//     query(sql2,(result2)=>{
//       if(!result2.length) return res.send({code:404,msg:"账号或密码错误"})
//       result2.map(item=> delete item.password)
//       const token = JWT.setToken({username,password},"1d")
//       res.send({code:200,msg:"登录成功",data:result2,token})
//     })
//   })
// })


//查询所有用户
useRouter.get("/all/user",async(req,res)=>{
  const sql = "select * from user order by userId desc"
  query(sql,(result)=>{
    if(!result.length) return res.send({code:404,msg:"查询失败"})
    res.send({code:200,msg:"查询成功",data:result,total:result.length })
  })
})

//查询指定用户
useRouter.get("/all/user/any/one",async(req,res)=>{
  const {userId} = req.query
  const sql = `select * from user where userId = '${userId}'`
  query(sql,(result)=>{
    if(result.length==false) return res.send({code:404,msg:"查询失败"})
    res.send({code:200,msg:"查询成功",data:result})
  })
})

//删除用户
useRouter.get("/delete/user/any/one",async(req,res)=>{
  const {userId} = req.query
  const sql0 = `delete from user where userId = '${userId}'`
  const sql1 = `delete from orderdetail where userId = '${userId}'`
  const sql2= `delete from car where userId = '${userId}'`
  const sql3= `delete from address where userId = '${userId}'`
  query(sql0,(result0)=>{
    if(result0.length==false) return res.send({code:404,msg:"删除失败"})
    query(sql1,(result1)=>{
      if(result1.length==false) return res.send({code:404,msg:"删除失败"})
      query(sql2,(result2)=>{
        if(result2.length==false) return res.send({code:404,msg:"删除失败"})
        query(sql3,(result3)=>{
          if(result3.length==false) return res.send({code:404,msg:"删除失败"})
          res.send({code:200,msg:"删除成功"})
        })
      })
    })
  })
})

//添加用户
useRouter.post("/add/user",async(req,res)=>{
  const {userId,name,username,password} = req.body
  const sql = `insert into user(userId,name,username,password) values('${userId}','${name}','${username}','${password}')`
  query(sql,(result)=>{
    if(result.length==false) return res.send({code:404,msg:"添加失败"})
    res.send({code:200,msg:"添加成功"})
  })
})
//修改用户
useRouter.post("/update/user",async(req,res)=>{
  const {userId,name,password} = req.body
  const sql = `update user set name = '${name}',password='${password}' where userId = '${userId}'`
  query(sql,(result)=>{
    if(result.length==false) return res.send({code:404,msg:"修改失败"})
    res.send({code:200,msg:"修改成功"})
  })
})


// //修改用户信息
// useRouter.post("/update/userInfo",async(req,res)=>{
//   let {userId,name,sex} = req.body
//   console.log(userId,name,sex)
//   if(!sex) sex = '1'
//   const sql =`update user set name = "${name}",sex = "${sex}" where userId = '${userId}'`
//   const sql1 = `select * from user where userId = "${userId}"` 
//   query(sql,(result)=>{
//     if(result==false) return res.send({code:404,msg:"修改失败"})
//     query(sql1,(result)=>{
//       if(!result.length) return res.send({code:404,msg:"修改失败"})
//       result.map(item=> delete item.password)
//       res.send({code:200,msg:"修改成功",data:result})
//     })
//   })
// })

module.exports = useRouter