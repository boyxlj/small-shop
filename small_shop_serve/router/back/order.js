const orderRouter = require("express")()
const query = require("../../util/mysql2")


//删除订单 --
orderRouter.post("/delete/order", async (req, res) => {
  const { orderNumber } = req.body
  const sql = `delete from orderdetail  where orderNumber = "${orderNumber}"`
  query(sql, (result) => {
    if (result.length == false) return res.send({ code: 404, msg: "删除订单失败" })
    res.send({ code: 200, msg: "删除订单成功" })
  })
})

const getTotalPrice = (arr) => {
  return arr.reduce((total, item) => {
    return total += Number(item.num) * Number(item.price)
  }, 0)
}


//查询购物车商品
orderRouter.get("/select/car", async (req, res) => {
  const sql = `select * from car`
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    res.send({ code: 200, msg: "查询成功",data:result, total: result.length })
  })
})


//订单查询
orderRouter.post("/select/order/list", async (req, res) => {
  const {  type } = req.body
  const ALLPATH = `o.orderId,o.singleTotalPrice,o.type,o.orderNumber,o.createTime,o.sendTime,o.pay,
  o.detailId,o.num,o.price,s.title,s.prePrice,s.titleImg,s.descs,a.name,a.phone,a.detailAddress
  from orderdetail o inner join shopdetail s on o.detailId = s.detailId inner join address a on o.addressId = a.addressId`
  const sql = `select ${ALLPATH} order by orderId desc`
  const sql1 = `select ${ALLPATH} where o.type = "2" order by orderId desc`
  const sql2 = `select ${ALLPATH} where o.type = "3" order by orderId desc `
  if (Number(type) == 2) {
    query(sql1, async (result) => {
      if (!result.length) return res.send({ code: 404, msg: "查询失败" })
      const results = [...new Set(result.map(item => item.orderNumber))]
      let newArr = []
      results.map((item, index) => {
        query(`select ${ALLPATH} where orderNumber = "${item}"`, async (result) => {
          if (!result.length) return res.send({ code: 404, msg: "查询失败" })
          newArr.push({
            name: result[0].name,
            type: result[0].type,
            createTime: result[0].createTime,
            orderNumber: result[0].orderNumber,
            totalPrice: getTotalPrice(result),
            orderList: result,
          })
        })
      })
      setTimeout(() => {
        res.send({
          code: 200, msg: "查询成功", data: newArr, total: newArr.length
        })
      }, 50)
    })
  }
  else if (Number(type) == 3) {
    query(sql2, async (result) => {
      if (!result.length) return res.send({ code: 404, msg: "查询失败" })
      const results = [...new Set(result.map(item => item.orderNumber))]
      let newArr = []
      results.map((item, index) => {
        query(`select ${ALLPATH} where orderNumber = "${item}"`, async (result) => {
          if (!result.length) return res.send({ code: 404, msg: "查询失败" })
          newArr.push({
            name: result[0].name,
            type: result[0].type,
            createTime: result[0].createTime,
            orderNumber: result[0].orderNumber,
            totalPrice: getTotalPrice(result),
            orderList: result,
          })
        })
      })
      setTimeout(() => {
        res.send({
          code: 200, msg: "查询成功", data: newArr, total: newArr.length
        })
      }, 50)
    })
  } else {
    query(sql, async (result) => {
      if (!result.length) return res.send({ code: 404, msg: "查询失败" })
      const results = [...new Set(result.map(item => item.orderNumber))]
      let newArr = []
      results.map((item, index) => {
        query(`select ${ALLPATH} where orderNumber = "${item}"`, async (result) => {
          if (!result.length) return res.send({ code: 404, msg: "查询失败" })
          newArr.push({
            name: result[0].name,
            type: result[0].type,
            createTime: result[0].createTime,
            orderNumber: result[0].orderNumber,
            totalPrice: getTotalPrice(result),
            orderList: result,
          })
        })
      })

      setTimeout(() => {
        res.send({
          code: 200, msg: "查询成功", data: newArr, total: newArr.length
        })
      }, 50)
    })
  }
})


//订单详情查询
orderRouter.post("/select/order/list/detail", async (req, res) => {
  const { orderNumber } = req.body
  const ALLPATH = `o.orderId,o.singleTotalPrice,o.type,o.orderNumber,o.createTime,o.sendTime,o.pay,
  o.detailId,o.num,o.price,s.title,s.prePrice,s.titleImg,a.name,a.phone,a.detailAddress
  from orderdetail o inner join shopdetail s on o.detailId = s.detailId inner join address a on o.addressId = a.addressId`
  const sql = `select ${ALLPATH} where o.orderNumber = "${orderNumber}" `
  query(sql, async (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
      res.send({
        code: 200, msg: "查询成功",
         data: [{
         info:[{
          name: result[0].name,
          type: result[0].type,
          time: result[0].createTime,
          orderNumber: result[0].orderNumber,
          phone: result[0].phone,
          address: result[0].detailAddress,
          totalPrice: getTotalPrice(result),
         }],
          orderList: result,
         }],
         total: result.length
      })
  })
})
module.exports = orderRouter