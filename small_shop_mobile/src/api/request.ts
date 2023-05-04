import Axios from "./index";
import {ISearch} from "@/types/shop"
import {TCategoryReq} from "@/types/category"
import {LoginForm} from "@/types/login"
import {ICarOrderParams} from "@/types/order"
//获取首页轮播
export const getSwiper = ()=>Axios.get("/user/swiper")

//查询首页数据
export const getIndexShopData = ()=>Axios.get("/user/category?type=")

//查询指定商品信息
export const getShopDetail = (detailId:number )=>Axios.post("/user/shopdetails",{detailId})

//查询指定商品轮播
export const getShopSwiper = (detailId:number)=>Axios.post("/user/detailSwiper",{detailId})

//随机获取商品
export const getRandomShop = (number:number)=>Axios.get(`/user/shop/random?number=${number}`)

//关键字查询商品
export const getSearchShop = (obj:ISearch)=>Axios.post("/user/shopsearch",obj)

//用户登录
export const login = (obj:LoginForm)=>Axios.post(`/user/login`,obj)


//查询分类数据
export const getCategory = ()=>Axios.get("/user/category?type=category")

//查询分类下数据
export const getCategoryShop = (data:TCategoryReq)=>Axios.post("/user/categoryparent",data)


//判断用户是否收藏商品
export const getIsCollect = (userId:number |string,detailId:number)=>Axios.post(`/user/iscollect`,{userId,detailId},)

//移除收藏
export const getAddRemoveCollect = (userId:number,detailId:number)=>Axios.post(`/user/delcollectnews`,{userId,detailId})
//移除收藏
export const getRemoveCollectByCollectId = (collectId:number)=>Axios.post(`/user/delcollect`,{collectId},)

//添加收藏
export const getAddCollect = (userId:number,detailId:number)=>Axios.post(`/user/addcollect`,{userId,detailId},)

//验证当前商品是否已添加至购物车
export const getIsAddCar = (userId:number,detailId:number)=>Axios.post(`/user/addcar`,{userId,detailId})


//查询用户收藏列表
export const getSelectCollect = (userId:number)=>Axios.post(`/user/usercollect`,{userId})

//查询用户订单
export const getSelectOrderAll = (userId:number,type:number)=>Axios.post(`/user/select/order/list`,{userId,type})

//删除订单
export const getDeleteOrder = (orderNumber:string)=>Axios.post(`/user/delete/order`,{orderNumber})

//查询用户购物车
export const getSelectCarShop = (userId:number)=>Axios.post(`/user/selectcar`,{userId})

//修改购物车数量
export const updateCarNum = (userId:number,num:number,carId:number)=>Axios.post(`/user/updatecarnum`,{userId,num,carId})

//移除购物车商品
export const removeCarShop = (userId:number,carId:number)=>Axios.post(`/user/clearcar`,{userId,carId})


//购物车订单提交
export const submitOrder = (data:ICarOrderParams)=>Axios.post(`/user/submitorder`,data)


//设置订单的收货地址
export const setOrderAddress = (orderNumber:number,addressId:number,removeCarList:any,type:string | number)=>Axios.post(`/user/setorderaddress`,{orderNumber,addressId,removeCarList,type})


//查询确认订单详情
export const getSelectConfirmOrder = (orderNumber:string)=>Axios.post(`/user/confirmorder`,{orderNumber})


//获取用户收货地址
export const getAllAddress = (userId:number)=>Axios.post(`/user/selectaddress`,{userId})

//设置默认收货地址
export const setDefaultAddress = (addressId:number)=>Axios.post(`/user/setdefaultaddress`,{addressId})


//设置订单状态
export const setOrderState = (orderNumber:string,type:string)=>Axios.post(`/user/set/order/state`,{orderNumber,type})

//设置订单的收货地址
export const setOrderAddressByPay = (orderNumber:number,addressId:number,removeCarList:any[],type:string)=>Axios.post(`/user/setorderaddress`,{orderNumber,addressId,removeCarList,type})


//关于内容