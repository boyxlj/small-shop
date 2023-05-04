import {randomShop,addCollect,
  isAddCar,
   selectCollect,removeCollectByCollectId } from "../../api/request";
import Dialog from "@vant/weapp/dialog/dialog";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isCollect: false,
    collectList: [],
    likeData:[],
  },


  //跳转详情页
  tiaoDetail(e){
    const detailId = e.currentTarget.dataset.detailid
    wx.navigateTo({
      url: `/pages/detail/detail?detailId=${detailId}`,
    })
  },
  //取消收藏
  cancelCollect(e){
    const collectId = e.currentTarget.dataset.collectid
    Dialog.confirm({
      title: '温馨提示',
      message: '您确定要取消收藏当前商品吗？',
      confirmButtonColor:"#cf0a2c"
    })
      .then(async () => {
          const {data:res} =await removeCollectByCollectId(collectId)
    if(res.code!=200) return wx.showToast({
      title: '取消收藏失败',
      icon:'none'
    })
    this.getCollect()
      })
      .catch(() => {
        // on cancel
      });
  
  },
  //加入购物车
  addCar(e){
    const detailId = e.currentTarget.dataset.detailid
    this.getIsAddCar(detailId)
  },
  //查询收藏列表
  async getCollect() {
    wx.showLoading();
    const { data: res } = await selectCollect(
      app.globalData.userInfo.userId
    ).finally(() => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    });
    if (res.code != 200) return this.setData({ collectList: [] });
    this.setData({ collectList: res.data });
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
  //验证当前商品是否已添加至购物车
  async getIsAddCar(detailId){
    const {data:res} = await isAddCar(app.globalData.userInfo.userId,
      detailId)
     if(res.code==404) return wx.showToast({
       title: '添加购物车失败',
       icon:'none'
     })
     if(res.code==403) return wx.showToast({
       title: '购物车已存在该商品',
       icon:'none'
     })
     wx.showToast({
       title: '添加至购物车',
       icon:'success'
     })
  },
  onLoad(options) {
    this.getCollect();
    this.getLikeShop()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getCollect();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getCollect();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
