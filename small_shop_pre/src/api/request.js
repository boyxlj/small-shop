import Axios from "./index";
//--------------------用户
//登录    /user/login   post
export const userLogin = (obj)=>Axios.post("/user/login",obj) 

//注册    /user/register   post
export const userRegister = (obj)=>Axios.post("/user/register",obj) 

//修改用户信息
export const updateUserInfo = (obj)=>Axios.post('/user/update/userInfo',obj) 

//首页轮播    /user/swiper   get
export const indexSwiper = ()=>Axios.get("/user/swiper") 

//查询分类商品    /user/categoryone?type=手机   get
export const getCategoryOne = (type)=>Axios.get(`/user/categoryone?type=${type}`) 

//查询分类    /user/category?type=category   get
export const getCategory = (type)=>Axios.get(`/user/category?type=${type}`) 

//查询分类下的商品    /user/categoryparent   post
export const getCategoryShop = (obj)=>Axios.post('/user/categoryparent',obj) 

//查询分类下的商品    /user/categoryalls   get
export const getCategoryalls = (obj)=>Axios.post('/user/categoryalls',obj) 

//查询商品轮播    /user/detailSwiper   post
export const getDetailSwiper = (detailId)=>Axios.post('/user/detailSwiper',{detailId}) 

//查询指定商品信息    /user/shopdetails   post
export const getShopdetails = (detailId)=>Axios.post('/user/shopdetails',{detailId}) 

//-------------收藏

//判断用户是否收藏当前商品    /user/iscollect   post
export const userIscollect = (userId,detailId)=>Axios.post('/user/iscollect',{userId,detailId}) 

//获取用户收藏的商品    /user/usercollect   post
export const getUserCollect = (userId)=>Axios.post('/user/usercollect',{userId}) 

//添加收藏    /user/addcollect   post
export const addCollect = (userId,detailId)=>Axios.post('/user/addcollect',{userId,detailId}) 

//移除收藏 通过收藏id    /user/delcollect   post
export const deleteCollect = (collectId)=>Axios.post('/user/delcollect',{collectId}) 

//移除收藏 通过用户id和商品id    /user/delcollectnews   post
export const deleteCollectnews = (userId,detailId)=>Axios.post('/user/delcollectnews',{userId,detailId}) 


//搜索查询商品    /user/shopsearch   post
export const getShopSearch = (obj)=>Axios.post('/user/shopsearch',obj) 



//--------购物车
//添加至购物车    /user/addcar   post
export const addCar = (userId,detailId)=>Axios.post('/user/addcar',{userId,detailId}) 

//查询购物车商品   /user/selectcar     post
export const selectCar = (userId)=>Axios.post('/user/selectcar',{userId}) 

//查询购物车商品总数  /user/selectcartotal     post
export const selectCarTotal = (userId)=>Axios.post('/user/selectcartotal',{userId}) 

//清空购物车商品   /user/clearcar     post
export const clearCar = (userId,carId)=>Axios.post('/user/clearcar',{userId,carId}) 


//修改购物车商品的数量   /user/updatecarnum     post
export const updateCarNum = (obj)=>Axios.post('/user/updatecarnum',obj) 


//订单-----------------------
// 提交订单       /user/submitorder   post
export const submitOrder = (obj)=>Axios.post('/user/submitorder',obj) 

// 确认订单查询       /user/confirmorder   post
export const confirmOrder = (orderNumber)=>Axios.post('/user/confirmorder',{orderNumber}) 

// 设置商品信息(状态,收货地址)     /user/setorederaddress   post
export const setOrdererAddress = (orderNumber,addressId,removeCarList,type)=>Axios.post('/user/setorderaddress',{orderNumber,addressId,removeCarList,type}) 
// 结算(支付)订单查询     /user/confirm/pay/order   post
export const confirmPayOrder = (orderNumber)=>Axios.post('/user/confirm/pay/order',{orderNumber}) 
// 删除订单     /user/delete/order  post
export const deleteOrderNumber = (orderNumber)=>Axios.post('/user/delete/order',{orderNumber}) 
//修改订单的状态    /user/set/order/state
export const setOrderState = (orderNumber,type)=>Axios.post('/user/set/order/state',{orderNumber,type}) 

//订单查询     /user/select/order/list
export const selectUserOrder = (userId,type)=>Axios.post('/user/select/order/list',{userId,type}) 

//订单详情查询     /user/select/order/list/detail
export const selectUserOrderDetail = (orderNumber)=>Axios.post('/user/select/order/list/detail',{orderNumber}) 






//收货地址-----------------------
//查询用户收货地址     /user/selectaddress  post
export const selectAddressAll = (userId)=>Axios.post('/user/selectaddress',{userId}) 

//添加用户收货地址     /user/addaddress  post
export const addAddress = (obj)=>Axios.post('/user/addaddress',obj) 


//修改用户收货地址     /user/updateaddress  post
export const updateAddress = (obj)=>Axios.post('/user/updateaddress',obj) 

//查询指定收货地址     /user/selectaddressone  post
export const selectAddressOne = (addressId)=>Axios.post('/user/selectaddressone',{addressId}) 

//删除用户收货地址     /user/removeaddress  post
export const removeAddress = (addressId)=>Axios.post('/user/removeaddress',{addressId}) 

//设置默认收货地址     /user/setdefaultaddress  post
export const setDefaultAddress = (addressId)=>Axios.post('/user/setdefaultaddress',{addressId}) 
