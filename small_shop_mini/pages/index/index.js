// index.js
// 获取应用实例
const app = getApp();
import { getIndexSwiper, getIndexShopData } from "../../api/request";
Page({
  data: {
    value: "",
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    swiperList: [],
    shopData: [],
  },

  //获取首页轮播
  async getSwiper(value) {
    const { data: res } = await getIndexSwiper();
    if (res.code != 200)
      return wx.showToast({
        title: "网络异常,请稍后尝试",
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
      swiperList: res.data,
    });
  },
  //获取首页商品数据
  async getShop(value) {
    const { data: res } = await getIndexShopData();
    if (res.code != 200)
      return wx.showToast({
        title: "网络异常,请稍后尝试",
        icon: "none",
      });
    wx.stopPullDownRefresh();
    if (value) {
      wx.showToast({
        title: "刷新成功",
        icon: "success",
      });
    }

    const newData = res.data
      ?.map((item) => {
        if (item.children?.length >= 2) {
          item.children = item.children.slice(0, 6);
          return item;
        }
      })
      ?.filter((item) => item);
    this.setData({
      shopData: newData,
    });
  },

  //跳转搜索页面
  tiaosearch() {
    wx.navigateTo({
      url: "/pages/search/search",
    });
  },
  onLoad() {
    this.getSwiper();
    this.getShop();
  },
  onShow() {
    this.getTabBar().setData({
      value: 0,
    });
  },
  onPullDownRefresh() {
    // wx.startPullDownRefresh()
    this.getSwiper(true);
    this.getShop(true);
  },
});
