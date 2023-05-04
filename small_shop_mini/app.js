// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const userInfo = wx.getStorageSync('userInfo') || false
    const token = wx.getStorageSync('token')
    this.globalData.userInfo = JSON.parse(userInfo)
    this.globalData.token = token
  },
  globalData: {
    userInfo:null,
    token:null,
    prePath:null,
    detailId:null,
    isGoBack:false
  }
})
