import {selectCarShop,removeCarShop,randomShop,updateCarNum,submitOrder} from "../../api/request"
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
    checked: false,
    allChecked:false,
    num:0,
    totalPrice:0
  },

  onOpen(){
    // console.log("打开");
  },
  //计数器切换
  async  onChangeNum(event) {
    const carId = event.currentTarget.dataset.carid
    const num = event.detail
    const {data:res} = await updateCarNum(app.globalData.userInfo.userId,carId,num)
    if(res.code!=200) return
    this.getCars()
    this.setData({totalPrice:0,num:0,allChecked:false})
  },
  //复选框切换
  onChangeCheck(event) {
    const carId = event.currentTarget.dataset.carid
    const isCheck = event.detail
    let newList = this.data.carList.map(item=>{
      if(item.carId==carId){
        item.checked = isCheck
        return item
      }
      return item
    })
    const totalPrice = this.data.carList?.filter(item=>item.checked)?.reduce((total,item)=>total+=Number(item.num)*Number(item.price),0)
    const num = this.data.carList?.filter(item=>item.checked)?.reduce((total,item)=>total+=Number(item.num),0)
    const isAllSelect = this.data.carList?.every(item=>item.checked)
    if(isAllSelect){
      this.setData({carList:newList,totalPrice,num,allChecked:true})
    }else{
      this.setData({carList:newList,totalPrice,num,allChecked:false})
    }
  },
  //点击全选
  allSelectChecked(){
    if(!this.data.allChecked){
    const newData = this.data.carList?.map(item=>{
      if(!item.checked){
        item.checked=  true
        return item
      }
      return item
    })
    const totalPrice = this.data.carList?.reduce((total,item)=>total+=Number(item.num)*Number(item.price),0)
    const num = this.data.carList?.reduce((total,item)=>total+=Number(item.num),0)
    this.setData({carList:newData,allChecked:true,totalPrice,num})
  }else{
    const newData = this.data.carList?.map(item=>{
      if(item.checked){
        item.checked=  false
        return item
      }
      return item
    })
    this.setData({carList:newData,allChecked:false,num:0,totalPrice:0})
  }
  },

  //订单结算
  async submitOrder(){
    if(!this.data.num) return wx.showToast({
      title: '请至少选择一种商品',
      icon:"none"
    }); 
    const orderNumber =new Date().getTime()
    const datas = this.data.carList?.filter(item=>item.checked).map(item=>{
      item.singleTotalPrice = Number(item.price)*Number(item.num)
      return item
    })
    const obj ={
      detailId: datas,
      userId:app.globalData.userInfo.userId,
      orderNumber
    }
    const {data:res} = await submitOrder(obj)
    if(res.code!=200) return wx.showToast({
      title: '订单提交失败',
      icon:"error"
    })
    const lists = JSON.stringify(datas)
    wx.navigateTo({
      url:  `/pages/checkout/checkout?orderNumber=${orderNumber}&datas=${lists}`,
    })

  },
  //点击删除某个购物车商品
  //删除某个购物车商品
  deleteCar(e){
    const carId = e.currentTarget.dataset.carid
    Dialog.confirm({
      title: '温馨提示',
      message: '是否确认从购物车中移除当前商品?',
    })
      .then(() => {
        this.deleteShop(carId)
      })
      .catch(() => {
        // on cancel
      });
  },
  //跳转商品详情
  shopDetail(e){
    const detailId = e.currentTarget.dataset.detailid
    wx.navigateTo({
      url: `/pages/detail/detail?detailId=${detailId}`,
    })
  },

  //查询购物车商品
  async getCars(value){
    wx.showLoading()
    if(!app.globalData.token) return
    const {data:res} = await selectCarShop(app.globalData.userInfo.userId).finally(
      ()=>{
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
      )
    if(res.code!=200) return this.setData({carList:[]})
    wx.stopPullDownRefresh()
    if(value){
      wx.showToast({
        title: '刷新成功',
      })
    } 
    const data = res.data.map(item=>{
      item.checked = false
      return item
    }
    )
    this.setData({carList:data})
  }, 
  //删除购物车中的某个商品
  async deleteShop(carId){
    const {data:res} = await removeCarShop(app.globalData.userInfo.userId,carId)
    if(res.code!=200) return wx.showToast({
      title: '删除失败',
      icon:'none'
    })
    this.getCars()
    setTimeout(()=>{
      wx.showToast({
        title: '删除成功',
        icon:'success'
      })
    },200)
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
     }
     this.setData({
      likeData:res.data
     })
  }, 
  onLoad(options) {
    this.getCars()
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
    this.getCars()
    this.getTabBar().setData({
      value:2
    })
    this.setData({totalPrice:0,num:0,allChecked:false})
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
    this.getCars(true)
    this.getLikeShop(true)
    this.setData({totalPrice:0,num:0,allChecked:false})

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