import {
  ShopDetail,
  ShopSwiper,
  randomShop,
  isCollect,
  removeCollect,
  addCollect,
  isAddCar,
} from "../../api/request";
import Dialog from "@vant/weapp/dialog/dialog";
import { verifyLogin } from "../../utils/verifyLogin";
const { globalData } = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailId: null,
    indicatorDots: true,
    isCollect: false,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    shopSwiper: [],
    likeData: [],
    shopInfo: {
      title: "",
      descs: "",
      detailDesc: "",
      price: "",
      prePrice: "",
      tag: "",
    },
  },
  //点击客服
  kefu() {
    // console.log("点击客服");
  
  },
  //跳转购物车
  tiaoCar() {
    if (verifyLogin()) {
      return;
    }
    wx.switchTab({
      url: "/pages/car/car",
    });
  },
  //点击收藏
  async clickCollect() {
    if (verifyLogin()) {
      return;
    }
    if (this.data.isCollect) {
      const { data: res } = await removeCollect(
        globalData.userInfo.userId,
        this.data.detailId
      );
      if (res.code != 200)
        return wx.showToast({
          title: "移除收藏失败",
          icon: "error",
        });
      wx.showToast({
        title: "移除收藏成功",
        icon: "success",
      });
      this.setData({ isCollect: false });
    } else {
      const { data: res } = await addCollect(
        globalData.userInfo.userId,
        this.data.detailId
      );
      if (res.code != 200)
        return wx.showToast({
          title: "添加收藏失败",
          icon: "error",
        });
      wx.showToast({
        title: "添加收藏成功",
        icon: "success",
      });
      this.setData({ isCollect: true });
    }
  },
  //添加购物车
  addCar() {
    if (verifyLogin()) {
      return;
    }
    this.getIsAddCar()
 
  },
  //立即购买
  goPay() {
    if (verifyLogin()) {
      return;
    }
  },
  //获取首页轮播
  async getSwiper(value) {
    const { data: res } = await getIndexSwiper();
    if (res.code != 200){
       
      wx.showToast({
        title: "数据异常,请稍后尝试",
        icon: "none",
      });
      wx.navigateBack(1)
      return
}
    this.setData({
      shopSwiper: res.data,
    });
  },
  async getSwiper(value) {
    const { data: res } = await ShopSwiper(this.data.detailId);
    if (res.code != 200){
       wx.showToast({
        title: "数据异常,请稍后尝试",
        icon: "none",
      });
      wx.navigateBack(1)
      return
    }
    wx.stopPullDownRefresh();
    this.setData({
      shopSwiper: res.data,
    });
  },
  async getShopInfo(value) {
    const { data: res } = await ShopDetail(this.data.detailId);
    if (res.code != 200)
      return wx.showToast({
        title: "数据异常,请稍后尝试",
        icon: "none",
      });
    wx.stopPullDownRefresh();
    this.setData({
      shopInfo: {
        title: res.data[0].title,
        descs: res.data[0].descs,
        detailDesc: res.data[0].detailDesc,
        price: res.data[0].price,
        prePrice: res.data[0].prePrice,
        tag: res.data[0].tag,
      },
    });
  },
  //随机获取猜你喜欢商品
  async getLikeShop(value) {
    const { data: res } = await randomShop(20);
    if (res.code != 200)
      return wx.showToast({
        title: "数据异常,请稍后尝试",
        icon: "none",
      });
    wx.stopPullDownRefresh();
    if (value) {
      wx.showToast({
        title: "刷新成功",
        icon: "success",
      });
    }
    this.setData({
      likeData: res.data,
    });
  },

  //点击拼团
  pintuan() {
    wx.showToast({
      title: "拼团活动敬请期待",
      icon: "none",
    });
  },
  //判断用户是否收藏当前商品
  async getIsCollect() {
    if (!globalData.token) return;
    const { data: res } = await isCollect(
      globalData.userInfo.userId,
      this.data.detailId
    );
    if (res.code != 200) return this.setData({ isCollect: false });
    this.setData({ isCollect: true });
  },
  onLoad(options) {
    this.setData({
      detailId: options.detailId,
    });
    globalData.detailId = options.detailId;
    this.getSwiper();
    this.getShopInfo();
    this.getLikeShop();
    this.getIsCollect();
  },

  //验证当前商品是否已添加至购物车
 async getIsAddCar(){
   const {data:res} = await isAddCar(globalData.userInfo.userId,
    this.data.detailId)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
    this.getSwiper(true);
    this.getShopInfo(true);
    // this.getLikeShop(true)
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
