import Dialog from '@vant/weapp/dialog/dialog';
const {globalData} = getApp()
export const verifyLogin = ()=>{
  const token = wx.getStorageSync('token')
  if(!token){
  let prePath = getCurrentPages()[getCurrentPages().length-1].route
  if(prePath=="pages/detail/detail"){
    prePath+= `?detailId=${globalData.detailId}`
  }
  globalData.prePath = prePath
  globalData.isGoBack = true
  if(!globalData.token) return Dialog.confirm({
    title: '温馨提示',
    message: '需要登录后进行操作,是否跳转登录？',
  })
    .then(() => {
      wx.navigateTo({
        url: `/pages/login/login`,
      })
    })
    .catch(() => {
      // on cancel
    });
    return true
  }else{
    return false
  }
}