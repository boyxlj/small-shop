const addressRouter = require("express")()
const query = require("../../util/mysql2")

//查询用户收货地址
addressRouter.post("/selectaddress", async (req, res) => {
  const { userId } = req.body
  const sql1 = `select * from address where userId = "${userId}"`
  const sql2 = `select * from address where userId = "${userId}" and type = "1"`
  query(sql2, (result2) => {
    query(sql1, (result1) => {
      if (!result1.length) return res.send({ code: 404, msg: "查询收货地址失败" })
      res.send({
        code: 200,
        msg: "查询收货地址成功",
        default: result2 ? result2 : [],
        data: result1,
        total: result1.length,
      })
    })
  })
})

//添加用户收货地址
addressRouter.post("/addaddress", async (req, res) => {
  const { userId, name, phone, city, detailAddress, type } = req.body
  const sql1 = `insert into address(userId,name,phone,city,detailAddress,type) 
  values("${userId}","${name}","${phone}","${city}","${detailAddress}","${type}") `
  const sql2 = `update address set type = 0 where type = 1`
  if (Number(type) == 1) {
    query(sql2, (result2) => {
      if (result2.length == false) return res.send({ code: 404, msg: "添加收货地址失败" })
      query(sql1, (result1) => {
        if (result1.length == false) return res.send({ code: 404, msg: "添加收货地址失败" })
        res.send({ code: 200, msg: "添加收货地址成功" })
      })
    })
  } else {
    query(sql1, (result1) => {
      if (result1.length == false) return res.send({ code: 404, msg: "添加收货地址失败" })
      res.send({ code: 200, msg: "添加收货地址成功" })
    })
  }
})


//修改用户收货地址
addressRouter.post("/updateaddress", async (req, res) => {
  const { addressId, name, phone, city, detailAddress, type } = req.body
  const sql1 = `update address set name = '${name}', phone = '${phone}', city = '${city}',
   detailAddress = '${detailAddress}', type = '${type}' where addressId = '${addressId}'`
  const sql2 = `update address set type = 0 where type = 1`
  if (Number(type) == 1) {
    query(sql2, (result2) => {
      if (result2.length == false) return res.send({ code: 404, msg: "修改收货地址失败" })
      query(sql1, (result1) => {
        if (result1.length == false) return res.send({ code: 404, msg: "修改收货地址失败" })
        res.send({ code: 200, msg: "修改收货地址成功" })
      })
    })
  } else {
    query(sql1, (result1) => {
      if (result1.length == false) return res.send({ code: 404, msg: "修改收货地址失败" })
      res.send({ code: 200, msg: "修改收货地址成功" })
    })
  }
})


//查询指定收货地址
addressRouter.post("/selectaddressone", async (req, res) => {
  const { addressId } = req.body
  const sql = `select * from address where addressId = "${addressId}" `
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询收货地址失败" })
    res.send({ code: 200, msg: "查询收货地址成功", data: result })
  })
})


//设置默认收货地址
addressRouter.post("/setdefaultaddress", async (req, res) => {
  const { addressId} = req.body
  const sql1 = `update address set type = 1 where addressId = "${addressId}"`
  const sql2 = `update address set type = 0 where type = 1`
    query(sql2, (result2) => {
      if (result2.length == false) return res.send({ code: 404, msg: "设置默认地址失败" })
      query(sql1, (result1) => {
        if (result1.length == false) return res.send({ code: 404, msg: "设置默认地址失败" })
        res.send({ code: 200, msg: "设置默认地址成功" })
      })
    })
})



//删除用户收货地址
addressRouter.post("/removeaddress", async (req, res) => {
  const { addressId } = req.body
  const sql = `delete from address where addressId = "${addressId}" `
  query(sql, (result) => {
    if (result.length == false) return res.send({ code: 404, msg: "删除收货地址失败" })
    res.send({ code: 200, msg: "删除收货地址成功" })
  })
})

module.exports = addressRouter