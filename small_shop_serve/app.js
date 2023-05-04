const express = require("express")
const JWT = require("./util/jst")
const { resolve } = require("path")
const app = express()
const noToken = require("./config/notoken")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const AllowOriginList = ['https://www.11e.top','http://www.11e.top','http://11e.top','http://127.0.0.1:3606','http://localhost:3606']

app.all("*", (req, res, next) => {
  if (AllowOriginList.includes(req.headers.origin)) {
      res.header("Access-Control-Allow-Origin", req.headers.origin)
      res.header("Access-Control-Allow-Headers", "content-type")
      res.header("Access-Control-Allow-Headers",["content-type",'Authorization']);
      res.header("Access-Control-Allow-Methods", 'DELETE,PUT,POST,GET,OPTIONS')
      if (req.method.toLowerCase() == 'options') {
        res.send(200)
      } else {
        next()
      }
    } else {
      res.status(404).send({
        code: 404,
        msg: 'error'
      })
    
  }
})




app.get("/", (req, res) => {
  res.send(`<h1>欢迎访问！http://localhost:3303</hr>`)
})

//前台
app.use("/api/user", require("./router/pre/user"))
app.use("/api/user", require("./router/pre/category"))
app.use("/api/user", require("./router/pre/collect"))
app.use("/api/user", require("./router/pre/order"))
app.use("/api", require("./router/pre/pay"))
app.use("/api/user", require("./router/pre/address"))

//后台
app.use("/api/back",require("./router/back/category"))
app.use("/api/back",require("./router/back/shop"))
app.use("/api/back",require("./router/back/manyUpload"))
app.use("/api/back", require("./router/back/user"))
app.use("/api/back", require("./router/back/order"))
app.use("/api/back", require("./router/back/admin"))
app.use("/api/back", require("./router/back/swiper"))


app.use(express.static(resolve(__dirname, "./public")))
app.use((req, res) => {
  res.status(404).send({
    code: 404, 
    msg: "路径有误"
  })
})
app.listen(3303, _ => console.log("服务器已启动! http://localhost:3303"))



