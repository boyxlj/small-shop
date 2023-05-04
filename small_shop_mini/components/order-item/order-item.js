
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderData:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转详情
    tiaoDetail(e){
      const detailId = e.currentTarget.dataset.detailid
      wx.navigateTo({
        url: `/pages/detail/detail?detailId=${detailId}`,
      })
    },
    //删除订单
    delete(e){
      const orderNumber = e.currentTarget.dataset.ordernumber
      this.triggerEvent("refesh",{orderNumber})
    },
    //支付订单
    pay(e){
      const orderNumber = e.currentTarget.dataset.ordernumber
      this.triggerEvent("pay",{orderNumber})
    }
  }
})
