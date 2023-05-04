const shopRouter = require("express")()
const query = require("../../util/mysql2")

//查询所有商品
shopRouter.get("/select/shop", async (req, res) => {
  const {type} = req.query
  if(type==0){
    const sql = "select * from shopdetail where parent is not null order by detailId desc "
    query(sql, (result) => {
      if (!result.length) return res.send({ code: 404, msg: "查询失败" })
      res.send({ code: 200, msg: "查询成功", data: result, total: result.length })
    })
  }else{
    const sql = `select * from shopdetail where parent = '${type}' order by detailId desc `
      query(sql, (result) => {
        if (!result.length) return res.send({ code: 404, msg: "查询失败" })
        res.send({ code: 200, msg: "查询成功", data: result, total: result.length })
      })

  }
})

//添加商品
shopRouter.post("/add/shop", async (req, res) => {
  let {title,descs,parent,prePrice,price,detailDesc,titleImg,tag} = req.body
  if(!Number(prePrice)){
    prePrice=""
  }
  const sql = `insert into shopdetail(title,descs,parent,prePrice,price,
    detailDesc,titleImg,tag) values('${title}','${descs}','${parent}',
    '${prePrice}','${price}','${detailDesc}','${titleImg}','${tag}') `
  const sql1 = `select * from shopdetail order by detailId desc`
  query(sql, (result) => {
    if (result.length==false) return res.send({ code: 404, msg: "添加失败" })
    query(sql1, (result1) => {
      if (!result1.length) return res.send({ code: 404, msg: "添加失败" })
      res.send({ code: 200, msg: "添加成功",detailId:result1[0].detailId })
    })
  })
})


//修改商品
shopRouter.post("/update/shop/base/info", async (req, res) => {
  let {title,descs,parent,prePrice,price,detailDesc,titleImg,detailId,tag} = req.body
  if(!Number(prePrice)){
    prePrice=""
  }
  if(!tag){
    tag=""
  }
  if(titleImg){
    const sql = `update shopdetail set title = '${title}',descs = '${descs}',parent = '${parent}'
    ,prePrice = '${prePrice}',price = '${price}',detailDesc = '${detailDesc}',titleImg = '${titleImg}',tag = '${tag}'
   where detailId = '${detailId}'`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "修改失败" })
      res.send({ code: 200, msg: "修改成功" })
    })
  }else{
    const sql = `update shopdetail set title = '${title}',descs = '${descs}',parent = '${parent}'
    ,prePrice = '${prePrice}',price = '${price}',detailDesc = '${detailDesc}',tag = '${tag}'
   where detailId = '${detailId}'`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "修改失败" })
      res.send({ code: 200, msg: "修改成功" })
    })
  }

})

//添加轮播
shopRouter.post("/add/shop/swiper/editor", async (req, res) => {
  const {imgs,detailId} = req.body
  const sql = `insert into shopswiper(imgs,detailId) values('${imgs}','${detailId}')`
  query(sql, (result) => {
    if (result.length==false) return res.send({ code: 404, msg: "添加失败" })
    res.send({ code: 200, msg: "添加成功" })
  })
})

//删除商品
shopRouter.post("/delete/shop", async (req, res) => {
  const {detailId} = req.body
  const sql1 = `delete from shopdetail where detailId = '${detailId}'`
  const sql2 = `delete from shopswiper where detailId = '${detailId}'`
  query(sql1, (result1) => {
    if (result1.length==false) return res.send({ code: 404, msg: "删除失败" })
    query(sql2, (result2) => {
      if (result2.length==false) return res.send({ code: 404, msg: "删除失败" })
      res.send({ code: 200, msg: "删除成功" })
    })
  })
})



//添加商品轮播
shopRouter.post("/add/shop/swiper", async (req, res) => {
  const {detailId,swiperList} = req.body
  if(!swiperList.length) return res.send({ code: 404, msg: "商品轮播添加失败" })
  swiperList.map(item=>(
    query(`insert into shopswiper(detailId,imgs) values("${detailId}","${item}")`, (result1) => {
      if (result1.length==false) return res.send({ code: 404, msg: "商品轮播添加失败" })
    })
  ))
  setTimeout(() => {
      res.send({ code: 200, msg: "商品轮播添加成功" })
  }, 50)
})


//查询指定商品信息或轮播
shopRouter.get("/select/shop/any/one", async (req, res) => {
  const {detailId} = req.query
  const sql = `select * from shopdetail where detailId = '${detailId}' `
  const sql1 = `select * from shopswiper where detailId = '${detailId}'`
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    query(sql1, (result1) => {
      res.send({ code: 200, msg: "查询成功", data: result,swiper:result1, dataTotal: result.length,swiperTotal:result1.length })
    })
  })
})

//删除指定轮播
shopRouter.get("/delete/shop/swiper/any/one", async (req, res) => {
  const {id} = req.query
  const sql = `delete from shopswiper where id = '${id}'`
  query(sql, (result) => {
    if (result.length==false) return res.send({ code: 404, msg: "删除失败" })
      res.send({ code: 200, msg: "删除成功" })
  })
})





module.exports = shopRouter