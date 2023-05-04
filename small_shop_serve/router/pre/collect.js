const collectRouter = require("express")()
const query = require("../../util/mysql2")
// const JWT = require("../util/jst")
// const getData = require("../util/getdataTree")

//查询用户收藏列表
collectRouter.post("/usercollect", async (req, res) => {
  //3表联查  shopdetail  collect  user
  const {userId} = req.body
  const sql = `
  select s.descs,s.title,s.detailId,s.titleImg,s.prePrice,s.price,s.tag,
  c.collectTime,c.collectId from shopdetail s inner join collect c on s.detailId = c.detailId 
   inner join user u on c.userId = u.userId where c.userId = ${userId} order by collectId desc `
  query(sql,(result)=>{
    if(!result.length) return res.send({code:404,msg:"查询失败"})
    res.send({code:200,msg:"查询成功",data:result})
  })
})



//添加收藏
collectRouter.post("/addcollect", async (req, res) => {
  const {userId,detailId} = req.body
  const sql = `insert into collect(userId,detailId) values("${userId}","${detailId}")`
  query(sql,(result)=>{
    if(result.length==0) return res.send({code:404,msg:"添加收藏失败"})
    res.send({code:200,msg:"添加收藏成功"})
  })
})


//查询是否已收藏当前文章
collectRouter.post("/iscollect", async (req, res) => {
  const {userId,detailId} = req.body             
  const sql = `select * from collect where detailId ="${detailId}" and userId = "${userId}"`
  query(sql,(result)=>{
    if(!result.length) return res.send({code:404,msg:"未收藏"})
    res.send({code:200,msg:"已收藏"})
  })
})


//移除收藏-通过收藏id
collectRouter.post("/delcollect", async (req, res) => {
  const {collectId} = req.body
  const sql = `delete from collect where collectId = "${collectId}"`
  query(sql,(result)=>{
    if(result.length==0) return res.send({code:404,msg:"移除收藏失败"})
    res.send({code:200,msg:"移除收藏成功"})
  })
})


//移除收藏-通过用户id和商品id
collectRouter.post("/delcollectnews", async (req, res) => {
  const {userId,detailId} = req.body
  const sql = `delete from collect where detailId ="${detailId}" and userId = "${userId}"`
  query(sql,(result)=>{
    if(result.length==0) return res.send({code:404,msg:"移除收藏失败"})
    res.send({code:200,msg:"移除收藏成功"})
  })
})

module.exports = collectRouter