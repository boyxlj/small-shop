const orderRouter = require("express")()
const query = require("../../util/mysql2")
// import { nanoid } from 'nanoid'

//添加购物车
orderRouter.post("/addcar", async (req, res) => {
  const { detailId, userId } = req.body
  const sql1 = `select * from car where detailId = "${detailId}" and userId = "${userId}" `
  const sql2 = `insert into car(detailId,userId) values("${detailId}","${userId}")`
  query(sql1, (result1) => {
    if (result1.length) return res.send({ code: 403, msg: "该商品已添加至购物车" })
    query(sql2, (result2) => {
      if (result2 == false) return res.send({ code: 404, msg: "添加至购物车失败" })
      res.send({ code: 200, msg: "添加成功" })
    })
  })
})


//查询购物车商品
orderRouter.post("/selectcar", async (req, res) => {
  // 3 表查询,user,shopdetail,car
  const { userId } = req.body
  const sql = `
     select c.carId,c.createTime,s.detailId,c.num,
     u.userId,s.title,s.titleImg,s.prePrice,s.price,s.tag
     from car c inner join user u on c.userId = u.userId 
     inner join shopdetail s on s.detailId = c.detailId 
     where c.userId = "${userId}" order by c.carId desc 
  `
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    res.send({ code: 200, msg: "查询成功", data: result, total: result.length })
  })
})



//查询购物车商品
orderRouter.post("/selectcartotal", async (req, res) => {
  const { userId } = req.body
  const sql = `select * from car where userId = "${userId}"`
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    res.send({ code: 200, msg: "查询成功", total: result.length })
  })
})


//设置商品信息(状态,收货地址)
orderRouter.post("/setorderaddress", async (req, res) => {
  const { orderNumber, addressId, removeCarList, type } = req.body
  const result2 = removeCarList.map(item => (
    query(`delete from car where carId = "${item}"`,
      (resultss) => {
        if (resultss == false) return
      }
    )
  )).every(item => item == true)
  const sql1 = `update orderdetail set addressId = "${addressId}",type = "${type}" where orderNumber = "${orderNumber}"`
  query(sql1, (result1) => {
    if (result1.length == false || result2.length == false) return res.send({ code: 404, msg: "设置商品信息失败" })
    res.send({ code: 200, msg: "设置商品信息成功" })
  })
})


//修改购物车中商品的数量
orderRouter.post("/updatecarnum", async (req, res) => {
  const { carId, num, userId } = req.body
  const sql = `update car set num = "${num}" where userId = "${userId}" and carId = "${carId}"`
  query(sql, (result) => {
    if (result.length == false) return res.send({ code: 404, msg: "修改数量失败" })
    res.send({ code: 200, msg: "修改数量成功" })
  })
})
//删除订单
orderRouter.post("/delete/order", async (req, res) => {
  const { orderNumber } = req.body
  const sql = `delete from orderdetail  where orderNumber = "${orderNumber}"`
  query(sql, (result) => {
    if (result.length == false) return res.send({ code: 404, msg: "删除订单失败" })
    res.send({ code: 200, msg: "删除订单成功" })
  })
})



//清空购物车商品
orderRouter.post("/clearcar", async (req, res) => {
  const { userId, carId } = req.body
  const sql1 = `delete from car where userId = "${userId}"`
  const sql2 = `delete from car where carId = "${carId}"`
  if (!carId) {
    query(sql1, (result1) => {
      if (result1 == false) return res.send({ code: 404, msg: "清空失败" })
      res.send({ code: 200, msg: "清空成功" })
    })
  } else {
    query(sql2, (result2) => {
      if (result2 == false) return res.send({ code: 404, msg: "清空失败" })
      res.send({ code: 200, msg: "清空成功" })
    })
  }
})



//提交订单
orderRouter.post("/submitorder", async (req, res) => {
  const { detailId, userId, orderNumber } = req.body
  const result1 = detailId.map(item => (
    query(`insert into orderdetail (detailId,userId,num,price,orderNumber,singleTotalPrice) values(
      "${item.detailId}","${userId}","${item.num}","${item.price}","${orderNumber}","${item.singleTotalPrice}"
      )`,
      (results) => {
        if (results == false) return res.send({ code: 404, msg: "订单提交失败" })
      }
    )
  ))
  if (result1 == false) return res.send({ code: 404, msg: "订单提交失败" })
  res.send({ code: 200, msg: "订单提交成功", orderNumber })
})
// //提交订单
// orderRouter.post("/submitorder", async (req, res) => {
//   const { detailId, userId,orderNumber } = req.body
//   const result1 = detailId.map(item => (
//     query(`insert into orderdetail (detailId,userId,num,price,orderNumber,singleTotalPrice) values(
//       "${item.detailId}","${userId}","${item.num}","${item.price}","${orderNumber}","${item.singleTotalPrice}"
//       )`,
//       (results) => {
//         if(results==false) return res.send({code:404,msg:"订单提交失败"}) 
//       }
//     )
//   ))
//   const result2 = detailId.map(item => (
//     query(`delete from car where carId = "${item.carId}"`,
//       (resultss) => {
//         if(resultss==false) return res.send({code:404,msg:"订单提交失败"})
//       }
//     )
//   )).every(item=>item==true)
//   if(result1==false || result1==false ) return res.send({code:404,msg:"订单提交失败"})
//   res.send({code:200,msg:"订单提交成功",orderNumber})
// })



//确认订单查询
orderRouter.post("/confirmorder", async (req, res) => {
  const { orderNumber } = req.body
  const sql = `select o.orderId,o.singleTotalPrice,o.orderNumber,o.type,o.createTime,o.sendTime,o.pay,
  o.detailId,o.num,o.price,s.title,s.prePrice,s.titleImg,s.tag
  from orderdetail o inner join shopdetail s on o.detailId = s.detailId 
  where orderNumber = "${orderNumber}" `
  query(sql, (result) => {
    // console.log(result)
    if (!result.length) return res.send({ code: 404, msg: "确认订单查询列表失败" })
    const totalPrice = result.reduce((total, item) => {
      return total += Number(item.num) * Number(item.price)
    }, 0)
    const totalNum = result.reduce((total, item) => {
      return total += Number(item.num)
    }, 0)
    res.send({ code: 200, msg: "确认订单查询列表成功", data: result, totalNum, totalPrice, total: result.length })
  })
})

//设置商品当前状态
orderRouter.post("/set/order/state", async (req, res) => {
  const { orderNumber, type } = req.body
  const sql = `update orderdetail set type = "${type}"
  where orderNumber = "${orderNumber}" `
  query(sql, (result) => {
    if (result.length == false) return res.send({ code: 404, msg: "设置商品当前状态失败" })
    res.send({ code: 200, msg: "设置商品当前状态成功" })
  })
})




//结算(支付)订单查询
orderRouter.post("/confirm/pay/order", async (req, res) => {
  const { orderNumber } = req.body
  const sql = `select o.orderId,o.singleTotalPrice,o.orderNumber,o.type,o.createTime,o.sendTime,o.pay,
  o.detailId,o.num,o.price,s.title,s.prePrice,s.titleImg,s.tag,a.name,a.phone,a.detailAddress
  from orderdetail o inner join shopdetail s on o.detailId = s.detailId inner join address a on o.addressId = a.addressId
  where orderNumber = "${orderNumber}" `
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "结算(支付)订单查询失败" })
    const totalPrice = result.reduce((total, item) => {
      return total += Number(item.num) * Number(item.price)
    }, 0)
    const totalNum = result.reduce((total, item) => {
      return total += Number(item.num)
    }, 0)
    res.send({ code: 200, msg: "结算(支付)订单查询成功", data: result, totalNum, totalPrice, total: result.length })
  })
})

const getTotalPrice = (arr) => {
  return arr.reduce((total, item) => {
    return total += Number(item.num) * Number(item.price)
  }, 0)
}


//订单查询
orderRouter.post("/select/order/list", async (req, res) => {
  const { userId, type } = req.body
  const ALLPATH = `o.orderId,o.singleTotalPrice,o.type,o.orderNumber,o.createTime,o.sendTime,o.pay,
  o.detailId,o.num,o.price,s.title,s.prePrice,s.titleImg,s.tag,a.name,a.phone,a.detailAddress
  from orderdetail o inner join shopdetail s on o.detailId = s.detailId inner join address a on o.addressId = a.addressId`
  const sql = `select ${ALLPATH} where o.userId = "${userId}" order by orderId desc`
  const sql1 = `select ${ALLPATH} where o.type = "2" and o.userId = "${userId}" order by orderId desc`
  const sql2 = `select ${ALLPATH} where o.type = "3" and o.userId = "${userId}" order by orderId desc `
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
        const sortArr = newArr.sort((a,b)=>{
          return  b.orderList[0].orderId-a.orderList[0].orderId
         })
        res.send({
          code: 200, msg: "查询成功", data: sortArr, total: newArr.length
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
        const sortArr = newArr.sort((a,b)=>{
         return  b.orderList[0].orderId-a.orderList[0].orderId
        })
        res.send({
          code: 200, msg: "查询成功", data: sortArr, total: newArr.length
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
        const sortArr = newArr.sort((a,b)=>{
          return  b.orderList[0].orderId-a.orderList[0].orderId
         })
        res.send({
          code: 200, msg: "查询成功", data: sortArr, total: newArr.length
        })
      }, 50)
    })
  }
})


//订单详情查询
orderRouter.post("/select/order/list/detail", async (req, res) => {
  const { orderNumber } = req.body
  const ALLPATH = `o.orderId,o.singleTotalPrice,o.type,o.orderNumber,o.createTime,o.sendTime,o.pay,
  o.detailId,o.num,o.price,s.title,s.prePrice,s.titleImg,s.tag,a.name,a.phone,a.detailAddress
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