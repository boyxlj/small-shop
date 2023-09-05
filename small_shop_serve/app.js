const express = require("express");
const JWT = require("./util/jst");
const { resolve } = require("path");
const app = express();
const cors = require('cors')
const noToken = require("./config/notoken");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
  res.send(`<h1>欢迎访问！http://localhost:3303</hr>`);
});

//前台
app.use("/api/user", require("./router/pre/user"));
app.use("/api/user", require("./router/pre/category"));
app.use("/api/user", require("./router/pre/collect"));
app.use("/api/user", require("./router/pre/order"));
app.use("/api", require("./router/pre/pay"));
app.use("/api/user", require("./router/pre/address"));

//后台
app.use("/api/back", require("./router/back/category"));
app.use("/api/back", require("./router/back/shop"));
app.use("/api/back", require("./router/back/manyUpload"));
app.use("/api/back", require("./router/back/user"));
app.use("/api/back", require("./router/back/order"));
app.use("/api/back", require("./router/back/admin"));
app.use("/api/back", require("./router/back/swiper"));

app.use(express.static(resolve(__dirname, "./public")));
app.use((req, res) => {
  res.status(404).send({
    code: 404,
    msg: "路径有误",
  });
});
app.listen(3303, (_) => console.log("服务器已启动! http://localhost:3303"));
