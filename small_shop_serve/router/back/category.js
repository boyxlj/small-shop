const categoryRouter = require("express")()
const query = require("../../util/mysql2")

//查询分类
/* 
  type == "category" ?查询分类 : 查询商品
*/
categoryRouter.get("/category", async (req, res) => {  
  const { type } = req.query
  const sql = "select * from shopdetail"
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    if (type == "category") {
      const newRes = result.filter(item => item.parent == null)
      res.send({ code: 200, msg: "查询分类成功", data: newRes,total:newRes.length})
    } else {
      const datas = getData(result, null, [])
      res.send({ code: 200, msg: "查询成功", data: datas,total:datas.length })
    }
  })
})

//添加分类
categoryRouter.post("/add/category", async (req, res) => {   //shopdetail
  const { categoryName } = req.body
    const sql = `insert into shopdetail(categoryName) values("${categoryName}")`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "添加分类失败" })
      res.send({ code: 200, msg: "添加分类成功" })
    })
})


//修改分类
categoryRouter.post("/update/category", async (req, res) => {   //shopdetail
  const { categoryName,detailId } = req.body
    const sql = `update shopdetail set categoryName = "${categoryName}" where detailId = "${detailId}"`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "修改分类失败" })
      res.send({ code: 200, msg: "修改分类成功" })
    })
})


//删除分类
categoryRouter.post("/delete/category", async (req, res) => {   //shopdetail
  const {detailId } = req.body
    const sql = `delete from shopdetail where detailId = "${detailId}"`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "删除分类失败" })
      res.send({ code: 200, msg: "删除分类成功" })
    })
})




module.exports = categoryRouter