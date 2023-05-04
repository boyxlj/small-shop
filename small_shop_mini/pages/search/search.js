import {searchShop} from "../../api/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    pageOn:1,
    pageCount:50,
    showEmpty:false,
    shopData:[]
  },

//输入框发生变化
changeInput(e){
  this.setData({
    inputValue:e.detail
  })
},
  //点击查询
  async search(){
    wx.showLoading({
      title: '搜索中',
    })
    if(!this.data.inputValue) return wx.showToast({
      title: '请先输入关键字',
      icon:"none"
    })
    this.setData({showEmpty:false})
    const {pageOn,pageCount,inputValue} = this.data
    const obj = {key:inputValue,pageOn,pageCount}
    const {data:res} = await searchShop(obj).finally(()=>wx.hideLoading())
    if(res.code!=200) return this.setData({showEmpty:true,shopData:[]})
    this.setData({
      shopData:res.data
    })
    // console.log("###",this.data.shopData);
  },

  //查询搜索数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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