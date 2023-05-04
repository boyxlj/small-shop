const categoryRouter = require("express")()
const query = require("../../util/mysql2")
const JWT = require("../../util/jst")
const getData = require("../../util/getdataTree")

//查询分类以及所有分类下的所有商品
/* 
  categoryName ?查询分类 : 查询商品
*/
categoryRouter.get("/category", async (req, res) => {  
  const { type } = req.query
  const sql = "select * from shopdetail order by detailId asc"
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    if (type == "category") {
      const newRes = result.filter(item => item.parent == null)
      res.send({ code: 200, msg: "查询分类成功", data: newRes })
    } else {
      const datas = getData(result, null, []).reverse()
      res.send({ code: 200, msg: "查询成功", data: datas })
    }
  })
})


// 指定查询(通过分类名称)
categoryRouter.get("/categoryone", async (req, res) => {   //shopdetail
  const { type } = req.query
  const sql = `select * from shopdetail where categoryName = "${type}"`
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    const sql2 = `select * from shopdetail where parent = "${result[0].detailId}"`
    query(sql2, (result2) => {
      if (!result2.length) return res.send({ code: 404, msg: "查询失败" })
      result[0].children = []
      result2.map(item=>{
        result[0].children.push(item)
      })
      res.send({ code: 200, msg: "查询成功", data: result })
    })
  })
})


//通过商品id查询分类对应的所有商品
categoryRouter.post("/categoryparent", async (req, res) => {   //shopdetail
  const { detailId,pageOn,pageCount} = req.body
  const sql1 = `select * from shopdetail where parent = "${detailId}"`
  const sql2 = `select * from shopdetail where parent = "${detailId}" order by detailId desc limit ${(pageOn-1)*pageCount} ,${pageCount}`
  query(sql1, (result1) => {
    if (!result1.length) return res.send({ code: 404, msg: "查询失败" })
      query(sql2, (result2) => {
        if (!result2.length) return res.send({ code: 404, msg: "查询失败" })
          res.send({ code: 200, msg: "查询成功", data: result2,total:result1.length })
      })
  })
})


// 随机查询数据
categoryRouter.get("/shop/random", async (req, res) => { 
  const {number} = req.query 
  let num = null
  number?num=number:num = 20
  const sql = `select * from shopdetail where parent is not null order by rand() limit ${num} `
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
      res.send({ code: 200, msg: "查询成功", data: result,total:result.length})
  })
  })



//查询所有商品
categoryRouter.post("/categoryalls", async (req, res) => {   //shopdetail
  const {pageOn,pageCount} = req.body
  const sql1 = `select * from shopdetail`   //  WHERE colour IS NOT NULL
  const sql2 = `select * from shopdetail WHERE parent is not null order by detailId desc limit ${(pageOn-1)*pageCount}, ${pageCount}`
  query(sql1, (result1) => {
    if (!result1.length) return res.send({ code: 404, msg: "查询失败" })
    const newRes1 = result1.filter(item=>item.parent!=null)
    query(sql2, (result2) => {
      if (!result2.length) return res.send({ code: 404, msg: "查询失败" })
      const newRes2 = result2.filter(item=>item.parent!=null)
        res.send({ code: 200, msg: "查询成功", data: newRes2,total:newRes1.length})
    })
  })
})


//首页轮播图
categoryRouter.get("/swiper",async(req,res)=>{
  const sql = "select * from swiper"
  query(sql,(result)=>{
    if(!result.length) return res.send({code:404,msg:"查询失败"})
    res.send({code:200,msg:"查询成功",data:result})
  })
})


//查询商品轮播
categoryRouter.post("/detailSwiper",async(req,res)=>{
  const {detailId} = req.body
  const sql = `select * from shopswiper where detailId = "${detailId}" `
  query(sql,(result)=>{
    if(!result.length) return res.send({code:404,msg:"查询失败"})
    res.send({code:200,msg:"查询成功",data:result})
  })
})


//查询指定商品信息
categoryRouter.post("/shopdetails", async (req, res) => {  
  const { detailId} = req.body
  const sql = `select * from shopdetail where detailId = "${detailId}"`
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
       res.send({ code: 200, msg: "查询成功", data: result})
  })
})


//搜索查询商品
categoryRouter.post("/shopsearch", async (req, res) => {  
  const { key,pageOn,pageCount} = req.body  //order by detailId desc
  const sql1 = `select * from shopdetail where parent is not null and title like "%${key}%" 
  or descs like "%${key}%" `
  const sql2= `select * from shopdetail where parent is not null and title like "%${key}%" 
  or descs like "%${key}%" order by detailId desc limit ${(pageOn-1)*pageCount},${pageCount}`
  query(sql1, (result1) => {
    if (!result1.length) return res.send({ code: 404, msg: "查询失败" })
    query(sql2, (result2) => {
      if (!result2.length) return res.send({ code: 404, msg: "查询失败" })
         res.send({ code: 200, msg: "查询成功", data: result2,total:result1.length})
    })
  })
})





module.exports = categoryRouter