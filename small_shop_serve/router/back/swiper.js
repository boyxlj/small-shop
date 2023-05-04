const swiperRouter = require("express")()
const query = require("../../util/mysql2")

//查询所有轮播
swiperRouter.get("/select/index/swiper", async (req, res) => {
  const sql = `select * from swiper order by id desc`
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
      res.send({ code: 200, msg: "查询成功",data:result,total:result.length })
  })
})

//添加轮播
swiperRouter.post("/add/editor/index/swiper", async (req, res) => {
  const {imgs} = req.body
  const sql = `insert into swiper(imgs) values('${imgs}')`
  query(sql, (result) => {
    if (result.length==false) return res.send({ code: 404, msg: "添加失败" })
    res.send({ code: 200, msg: "添加成功" })
  })
})

//删除指定轮播
swiperRouter.get("/delete/index/swiper", async (req, res) => {
  const {id} = req.query
  const sql = `delete from swiper where id = '${id}'`
  query(sql, (result) => {
    if (result.length==false) return res.send({ code: 404, msg: "删除失败" })
      res.send({ code: 200, msg: "删除成功" })
  })
})


module.exports= swiperRouter