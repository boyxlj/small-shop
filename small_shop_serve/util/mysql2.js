const mysql2 = require("mysql2")
const mysqlConfig = require("../config/sql")
const client = mysql2.createPool(mysqlConfig).promise()

const query = async(sql,callback)=>{
  try {
    const res = await client.query(sql)
    callback(res[0])
  } catch (error) {
    console.log("数据库连接失败")
  }
}

module.exports = query