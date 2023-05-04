// components/shop-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopData:{
      type:Array,
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
    shopdetail(e){
      const detailId = e.currentTarget.dataset.detailid
      wx.navigateTo({
        url: `/pages/detail/detail?detailId=${detailId}`,
      })
    },
    navigateCategory(e){
      const detailId = e.currentTarget.dataset.detailid
      wx.setStorageSync('detailId', detailId)
      wx.switchTab({
        url: `/pages/category/category`,
      })
    }

  }
})
