import {randomShop} from "../../api/request"
import Dialog from '@vant/weapp/dialog/dialog';
const {globalData} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginSuccess:false,
    userImg:"",
    name:"",
    likeData:[],
  },
//跳转个人中心
tiaoProfile(){
  wx.navigateTo({
    url: '/pages/profile/profile',
  })
},
  //点击登录
  clickLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //退出登录
  cancalLogin(){
    Dialog.confirm({
      title: '温馨提示',
      message: '您确定要退出登录吗？',
      confirmButtonColor:"#cf0a2c",
    })
      .then(() => {
        wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token')
    globalData.userInfo= null
    globalData.token= null
    this.setData({loginSuccess:false})
      })
      .catch(() => {
        // on cancel
      });
    
  },

  //点击跳转订单页
  tiaoOrder(e){
    const id = e.currentTarget.dataset.id
    if(!this.data.loginSuccess) return Dialog.confirm({
      title: '温馨提示',
      message: '需要登录后进行操作,是否跳转登录？',
    })
      .then(() => {
        wx.navigateTo({
          url: `/pages/login/login`,
        })
      })
      .catch(() => {
        // on cancel
      });
      wx.navigateTo({
        url: `/pages/order/order?id=${id}`,
      })
  },
  //点击我的资产相关内容
  tiaoMoney(e){
    const value = e.currentTarget.dataset.id
    const msg = e.currentTarget.dataset.msg
    if(value){
      if(!this.data.loginSuccess) return Dialog.confirm({
        title: '温馨提示',
        message: '需要登录后进行操作,是否跳转登录？',
      })
        .then(() => {
          wx.navigateTo({
            url: `/pages/login/login`,
          })
        })
        .catch(() => {
          // on cancel
        });
      Dialog.alert({
        title: '您的账户余额',
        message: '66666元',
        theme: 'round-button',
      }).then(() => {
        // on close
      });
      return
    }else{
      if(!this.data.loginSuccess) return Dialog.confirm({
        title: '温馨提示',
        message: '需要登录后进行操作,是否跳转登录？',
      })
        .then(() => {
          wx.navigateTo({
            url: `/pages/login/login`,
          })
        })
        .catch(() => {
          // on cancel
        });
        wx.showToast({
          title: `您的${msg}`,
          icon:"none"
        })
    }
   
  },
  //随机获取猜你喜欢商品
async getLikeShop(value){
  const {data:res} = await randomShop(20)
   if(res.code!=200) return wx.showToast({
    title: '网络异常,请稍后尝试',
    icon:"none"
  })
  wx.stopPullDownRefresh()  
   if(value){
     wx.showToast({
       title: '刷新成功',
       icon:"success"
     })
   }
   this.setData({
    likeData:res.data
   })
}, 
//跳转收藏
tiaoCollect(){
  if(!this.data.loginSuccess) return Dialog.confirm({
    title: '温馨提示',
    message: '需要登录后进行操作,是否跳转登录？',
  })
    .then(() => {
      wx.navigateTo({
        url: `/pages/login/login`,
      })
    })
    .catch(() => {
      // on cancel
    })
  wx.navigateTo({
    url: '/pages/collect/collect',
  })
},
  onLoad(options) {
    if(globalData.token){
      this.setData({
        loginSuccess:true,
        userImg:globalData.userInfo.avatar,
        name:globalData.userInfo.name
      })
    }
    this.getLikeShop()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // console.log("onShow",globalData);
    if(globalData.token){
      this.setData({
        loginSuccess:true,
        userImg:globalData.userInfo.avatar,
        name:globalData.userInfo.name
      })
    }
    this.getTabBar().setData({
      value:3
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})