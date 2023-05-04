import {selectOrderAll,deleteOrder,randomShop,setOrderState} from "../../api/request"
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id:"",
    active: 0,
    orderList:[],
    type:0,
    likeData:[],
    payDialogShow: false,
    orderNumber:null,
  },

  //删除订单后刷新数据
  onRefesh(e){
    const {orderNumber} = e.detail
    Dialog.confirm({
      title: '温馨提示',
      message: '确认要删除当前订单吗？',
      confirmButtonColor:"#cf0a2c"
    })
      .then(() => {
       this.deleteOrders(orderNumber)
      })
      .catch(() => {
      });
  },

  //删除订单
  async deleteOrders(orderNumber){
    const {data:res} = await deleteOrder(orderNumber)
    if(res.code!=200) return wx.showToast({
      title: '订单删除失败',
      icon:'error'
    })
    this.getOrder()
  },
  onChange(event) {
    this.getLikeShop()

    let type = 0
    const num = event.detail.name
    if(num==3 || num==4){
      return this.setData({orderList:[]})
    }else
    if(num==2){
      type=3
      this.setData({active:num,type})
    }else if(num==1){
      type=2
      this.setData({active:num,type})
    }else if(num==0){
      type=0
      this.setData({active:num,type})
    }
    this.getOrder()

    
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
  onLoad(options) {
    this.getLikeShop()
    const num = Number(options.id)
    let type = 0
    if(num==3 ){
      return this.setData({orderList:[],active:num})
    }else if(num==4){
      return this.setData({orderList:[],active:num})
    }
    else
    if(num==2){
      type=3
    }else if(num==1){
      type=2
    }else if(num==0){
      type=0
    }
    this.setData({active:num,type})
    this.getOrder()
  },


  //订单支付
  pay(e){
    const {orderNumber} = e.detail
    this.setData({payDialogShow:true,orderNumber})
  },

   //取消时触发
   cancel(){
    this.setData({payDialogShow:false})
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
          theme: 'round-button',
        }).then(() => {
          this.getOrder()
          this.setData({payDialogShow:false})
        });
        // Dialog.confirm({
        //   title: '支付结果',
        //   message: '恭喜您支付成功',
        //   cancelButtonText:"返回购物车",
        //   confirmButtonText:"查看订单"
        // })
        //   .then(() => {
        //     this.getOrder()
        //     this.setData({payDialogShow:false})
        //   })
        //   .catch(() => {
        //    this.setData({payDialogShow:false})
        //   });
      },4000)
  
    },
  
    onClose() {
      this.setData({payDialogShow:false})
    },
  //查询用户订单
  async getOrder(){
    wx.showLoading()
    const {data:res} = await selectOrderAll(app.globalData.userInfo.userId,this.data.type).finally(()=> {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
    if(res.code!=200) return this.setData({orderList:[]})
    this.setData({orderList:res.data})
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
    // this.getOrder()
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
    this.getOrder()
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