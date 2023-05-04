import {request} from "./index"
//查询首页轮播
export const getIndexSwiper =()=> request("/user/swiper") 

//查询首页数据
export const getIndexShopData = ()=>request("/user/category?type=")

//查询分类数据
export const getCategory = ()=>request("/user/category?type=category")

//查询分类下数据
export const CategoryShop = (data)=>request("/user/categoryparent",data,'POST')

//查询指定商品信息
export const ShopDetail = (detailId)=>request("/user/shopdetails",{detailId},'POST')

//查询指定商品轮播
export const ShopSwiper = (detailId)=>request("/user/detailSwiper",{detailId},'POST')

//关键字查询商品
export const searchShop = (data)=>request("/user/shopsearch",data,'POST')

//随机获取商品
export const randomShop = (number)=>request(`/user/shop/random?number=${number}`)

//用户登录
export const login = (username,password)=>request(`/user/login`,{username,password},"POST")

//判断用户是否收藏商品
export const isCollect = (userId,detailId)=>request(`/user/iscollect`,{userId,detailId},"POST")

//移除收藏
export const removeCollect = (userId,detailId)=>request(`/user/delcollectnews`,{userId,detailId},"POST")
//移除收藏
export const removeCollectByCollectId = (collectId)=>request(`/user/delcollect`,{collectId},"POST")

//添加收藏
export const addCollect = (userId,detailId)=>request(`/user/addcollect`,{userId,detailId},"POST")

//验证当前商品是否已添加至购物车
export const isAddCar = (userId,detailId)=>request(`/user/addcar`,{userId,detailId},"POST")


//查询用户购物车
export const selectCarShop = (userId)=>request(`/user/selectcar`,{userId},"POST")

//移除购物车商品
export const removeCarShop = (userId,carId)=>request(`/user/clearcar`,{userId,carId},"POST")

//修改购物车数量
export const updateCarNum = (userId,carId,num)=>request(`/user/updatecarnum`,{userId,carId,num},"POST")

//订单提交
export const submitOrder = (data)=>request(`/user/submitorder`,data,"POST")

//获取用户收货地址
export const getAllAddress = (userId)=>request(`/user/selectaddress`,{userId},"POST")

//设置默认收货地址
export const setDefaultAddress = (addressId)=>request(`/user/setdefaultaddress`,{addressId},"POST")

//查询确认订单详情
export const selectConfirmOrder = (orderNumber)=>request(`/user/confirmorder`,{orderNumber},"POST")

//删除订单
export const deleteOrder = (orderNumber)=>request(`/user/delete/order`,{orderNumber},"POST")

//查询用户订单
export const selectOrderAll = (userId,type)=>request(`/user/select/order/list`,{userId,type},"POST")


//设置订单的收货地址
export const setOrderAddress = (orderNumber,addressId,removeCarList,type)=>request(`/user/setorderaddress`,{orderNumber,addressId,removeCarList,type},"POST")

//设置订单状态
export const setOrderState = (orderNumber,type)=>request(`/user/set/order/state`,{orderNumber,type},"POST")

//查询用户收藏列表
export const selectCollect = (userId)=>request(`/user/usercollect`,{userId},"POST")

