import {getAllAddress,setDefaultAddress,setOrderState,selectConfirmOrder,deleteOrder,setOrderAddress} from "../../api/request"
import Dialog from '@vant/weapp/dialog/dialog';
const app= getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNumber:"",    //订单号
    show: false,       //是否显示弹出层
    addressList:[],     //所有收货地址列表
    defaultAddress:[],  //默认收货地址
    orderList:[],   //订单商品列表
    totalNum:0,   //订单总数
    totalPrice:0,  //订单总价
    isSubmit:false,
    payDialogShow: false,
    carList:[],    //清空购物车中的数据
  },

  //打开弹出层
  showPopup() {
    // this.getAddress()
    this.setData({ show: true });
    
  },

  //关闭弹出层
  onClose() {
    this.setData({ show: false });
  },

  //取消时触发
  cancel(){
  wx.redirectTo({
      url: '/pages/order/order?id=1',
    })
  },

  //点击提交订单
  async submitOrder(){
    if(!this.data.defaultAddress.length) return wx.showToast({
      title: '请选择或者添加收货地址',
      icon:'none'
    })
    const carIdList = this.data.carList.map(item=>item.carId)
    const {data:res} = await setOrderAddress(this.data.orderNumber,this.data.defaultAddress[0]?.addressId,carIdList,"2")
    if(res.code!=200) return
    this.setData({isSubmit:true,payDialogShow:true})
  },
  //点击确认
  async queren(){
    wx.showLoading({
      title: '支付校验中',
      mask:true
    })
    const {data:res} = await setOrderState(this.data.orderNumber,"3")
    setTimeout(()=>{
      wx.hideLoading()
      Dialog.alert({
        title: '支付结果',
        message: '恭喜您支付成功',
        confirmButtonText:"查看订单",
        confirmButtonColor:"#cf0a2c"
      })
        .then(() => {
          wx.redirectTo({
            url: '/pages/order/order',
          })
        })
        .catch(() => {
          wx.redirectTo({
            url: '/pages/car/car',
          })
        });
    },3000)

  },

  onClose() {
    this.setData({payDialogShow:false,show:false})
  },
  
  //设置默认收货地址
  async setDefault(e){
    const addressId = e.currentTarget.dataset.addressid
    const {data:res} = await setDefaultAddress(addressId)
    if(res.code!=200) return wx.showToast({
      title: '设置默认收货地址失败',
      icon:"error"
    })
    this.getAddress()
    this.setData({ show: false });
  },

  //点击添加收货地址
  addAddress(){
    console.log("点击添加收货地址");
  },
  //查询用户所有收货地址
  async getAddress(){
    const {data:res} = await getAllAddress(app.globalData.userInfo.userId)
    if(res.code!=200) return this.setData({addressList:[],defaultAddress:[]})
    this.setData({addressList:res.data,defaultAddress:res.default})
  },

  //跳转商品详情
  tiaoDetail(e){
    this.setData({isSubmit:true})
    const detailId =  e.currentTarget.dataset.detailid
    wx.navigateTo({
      url: `/pages/detail/detail?detailId=${detailId}`,
    })

  },
  

  //查询订单详情
  async getOrderDetail(){
    const {data:res} =await selectConfirmOrder(this.data.orderNumber)
    if(res.code!=200) return this.setData({orderList:[]})
    this.setData({orderList:res.data,totalNum:res.totalNum,totalPrice:res.totalPrice})
  },

  //删除订单
  async delete(){
    const {data:res} = await deleteOrder(this.data.orderNumber)
  },
  // async 
  onLoad(options) {
    this.setData({orderNumber:options.orderNumber,carList:JSON.parse(options.datas)})
    this.getAddress()
    this.getOrderDetail()
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
    this.setData({isSubmit:false})
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
    if(this.data.isSubmit) return ;
    this.delete()
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