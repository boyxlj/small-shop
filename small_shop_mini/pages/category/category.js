import { getCategory, CategoryShop } from "../../api/request";
Page({
  data: {
    activeKey: 0,
    pageOn: 1,
    pageCount: 50,
    detailId: null,
    categoryList: [],
    shopList: [],
  },

  onChange(event) {
    // console.log("点击了：",event.detail);
  },
  //跳转搜索页面
  tiaosearch() {
    wx.navigateTo({
      url: "/pages/search/search",
    });
  },
  //点击分类
  cateGoryName(e) {
    const detailId = e.currentTarget.dataset.detailid;
    this.getCategoryShop(detailId);
  },

  //获取商品分类
  async getCategoryData() {
    const { data: res } = await getCategory();
    if (res.code != 200)
      return wx.showToast({
        title: "服务异常,请稍后尝试",
        icon: "none",
      });
    this.setData({
      categoryList: res.data,
    });
    // console.log(res.data);
    this.getCategoryShop(res.data[0].detailId);
  },
  //查询分类下的商品
  async getCategoryShop(detailId) {
    if (this.activeKey == detailId) return;
    wx.showLoading({
      title: "加载中...",
    });
    const obj = {
      detailId,
      pageOn: this.data.pageOn,
      pageCount: this.data.pageCount,
    };
    const { data: res } = await CategoryShop(obj);
    if (res.code != 200) {
      this.setData({
        shopList: [],
      });
      wx.hideLoading();
      return;
    }
    wx.hideLoading();
    const findIndex = this.data.categoryList?.findIndex(
      (item) => item.detailId == detailId
    );
    this.setData({ activeKey: findIndex });
    this.setData({
      shopList: res.data,
    });
  },

  //跳转商品详情
  detail(e) {
    const detailId = e.currentTarget.dataset.detailid;
    wx.navigateTo({
      url: `/pages/detail/detail?detailId=${detailId}`,
    });
  },
  onLoad(options) {
    this.getCategoryData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(e) {
    this.getTabBar().setData({
      value: 1,
    });
    const detailId = wx.getStorageSync("detailId");
    if (detailId) {
      console.log(detailId);
      this.getCategoryShop(detailId);
      wx.removeStorageSync("detailId");
    }
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
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
