import Axios from "./index"


//------------分类
//获取分类数据  get   /back/category?type=category
export const categoryList = ()=>Axios.get("/back/category?type=category")
export const categoryAndChildren = ()=>Axios.get("/user/category?type=")
//添加分类  post   /back/add/category
export const addCategory = (categoryName)=>Axios.post("/back/add/category",{categoryName})

//修改分类  post   /back/update/category
export const updateCategory = (detailId,categoryName)=>Axios.post("/back/update/category",{detailId,categoryName})

//删除分类  post   /back/delete/category
export const deleteCategory = (detailId)=>Axios.post("/back/delete/category",{detailId})


//-----------------商品
//查询所有商品 get   /back/select/shop
export const getShopList = (type)=>Axios.get(`/back/select/shop?type=${type}`)

//添加商品
export const addShop = (obj)=>Axios.post("/back/add/shop",obj)

//修改商品基本信息   /back/update/shop/base/info
export const updateShopBaseInfo = (obj)=>Axios.post("/back/update/shop/base/info",obj)

//删除商品
export const deleteShop = (detailId)=>Axios.post("/back/delete/shop",{detailId})

//添加商品轮播(添加时)    /back/add/shop/swiper
export const addShopSwiper = (detailId,swiperList)=>Axios.post("/back/add/shop/swiper",{detailId,swiperList})

//查询指定商品信息或轮播     /back/select/shop/any/one?detailId=54
export const selectShopAnyOne = (detailId)=>Axios.get(`/back/select/shop/any/one?detailId=${detailId}`)

//删除指定轮播    /back/delete/shop/swiper/any/one?id=
export const deleteShopSwiperAnyOne = (id)=>Axios.get(`/back/delete/shop/swiper/any/one?id=${id}`)

//修改轮播图片    /back/upload
export const updateSwiperImg = (detailId)=>Axios.post(`/back/upload`,{detailId})

//添加轮播图片(编辑时)    /back/add/shop/swiper/editor
export const editorSwiperImg = (detailId,imgs)=>Axios.post(`/back/add/shop/swiper/editor`,{detailId,imgs})



//-----------------用户相关
//查询所有用户    /back/all/user
export const selectAllUser = ()=>Axios.get(`/back/all/user`)
//查询指定用户   /back/all/user/any/one?userId=8
export const selectUserOne = (userId)=>Axios.get(`/back/all/user/any/one?userId=${userId}`)
//添加用户  /back/add/user
export const addUser = (obj)=>Axios.post(`/back/add/user`,obj)
//修改用户信息  /back/update/user
export const updateUser = (obj)=>Axios.post(`/back/update/user`,obj)
//删除用户   /back/delete/user/any/one?userId=
export const deleteUser = (userId)=>Axios.get(`/back/delete/user/any/one?userId=${userId}`)


//---------------订单查询
//查询所有订单   /back/select/order/list
export const selectAllOrder = (type)=>Axios.post(`/back/select/order/list`,{type})
//删除订单    /back/delete/order
export const deleteOrder = (orderNumber)=>Axios.post(`/back/delete/order`,{orderNumber})


//-----管理员登录
export const setLogin = (obj)=>Axios.post(`/back/login`,obj)

//----轮播
//查询所有轮播  /back/select/index/swiper
export const selectIndexSwiper = ()=>Axios.get(`/back/select/index/swiper`)

//添加轮播     /back/add/editor/index/swiper
export const addIndexSwiper = (imgs)=>Axios.post(`/back/add/editor/index/swiper`,{imgs})

//删除轮播   /back/delete/index/swiper?id=6
export const deleteIndexSwiper = (id)=>Axios.get(`/back/delete/index/swiper?id=${id}`)


//购物车    /back/select/car
export const carData = ()=>Axios.get(`/back/select/car`)