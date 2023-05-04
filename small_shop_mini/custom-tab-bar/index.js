Page({
  data: {
    value: 0,
    list: [
      {  label: '首页', icon: 'home-o' ,pagePath:"/pages/index/index"},
      {  label: '分类', icon: 'apps-o',pagePath:"/pages/category/category" },
      {  label: '购物车', icon: 'shopping-cart-o',pagePath:"/pages/car/car" },
      {  label: '我的', icon: 'user-o',pagePath:"/pages/me/me" },
    ],
  },
  onChange(event) {
    this.setData({ active: event.detail });
    const token = wx.getStorageSync('token')
    if(this.data.list[event.detail].pagePath=="/pages/car/car"){
      if(!token){
        wx.showToast({
          title: '请先登录',
          icon:"none"
        })
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/login/login',
          })
        },800)
        return
      }
    }
    wx.switchTab({
      url: this.data.list[event.detail].pagePath,
    })
  },
});