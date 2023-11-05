// const BASEURL = "http://localhost:3303/api"
const BASEURL = "https://www.11e.top/api"
export const request = (url,data,method)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL+url,
      method: method?method:"GET",
      data,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

