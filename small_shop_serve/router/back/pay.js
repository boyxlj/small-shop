const payRouter = require("express")()
const query = require("../../util/mysql2")



payRouter.get("/pay", async (req, res) => {
  console.log("有人访问啦")
  res.send({code:200,msg:"支付成功"})
  // query(sql,(result)=>{
  //   if(!result.length) return res.send({code:404,msg:"查询失败"})
  //   res.send({code:200,msg:"查询成功",data:result})
  // })
})

module.exports = payRouter