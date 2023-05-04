import { login } from "../../api/request";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    loading: false,
    usernameError: false,
    passwordError: false,
  },

  //
  inputUsername(e) {
    this.setData({ usernameError: e.detail ? false : true });
  },
  inputPassword(e) {
    this.setData({ passwordError: e.detail ? false : true });
  },

  //点击登录
  async clickLogin() {
    const { username, password } = this.data;
    if (!username) {
      this.setData({ usernameError: true });
      return;
    }
    if (!password) {
      this.setData({ passwordError: true });
      return;
    }
    this.setData({ loading: true });
    const { data: res } = await login(username, password).finally(() =>
      this.setData({ loading: false })
    );
    if (res.code == 403)
      return wx.showToast({
        title: "账号不存在",
        icon: "none",
      });
    if (res.code == 404)
      return wx.showToast({
        title: "密码错误",
        icon: "none",
      });
    wx.showToast({
      title: "登录成功",
      icon: "success",
      mask:true
    });
    wx.setStorageSync("userInfo", JSON.stringify(res.data[0]));
    wx.setStorageSync("token", JSON.stringify(res.token));
    app.globalData.userInfo = res.data[0]
    app.globalData.token = res.token
    setTimeout(() => {
      if(app.globalData.isGoBack){
        wx.redirectTo({
        
          url: "/"+app.globalData.prePath,
        })
        app.globalData.isGoBack = false
      }else{
         wx.switchTab({
        url: "/pages/me/me",
      });
      }

      this.onShow();
    }, 1000);
  },
  onLoad(options) {

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
