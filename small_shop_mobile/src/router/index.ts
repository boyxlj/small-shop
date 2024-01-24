import { createRouter, createWebHistory } from "vue-router"
import {routes}  from "./routes"
 const router =  createRouter({
  routes: routes,
  history: createWebHistory('/small-shop-mobile'),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to,from,next)=>{
  const userInfo = localStorage.getItem("userInfo")
  const authorization:string[] = [
    "/collect",
    "/checkout",
  ]
  if(authorization.includes(to.path) && !userInfo){
    next("/login")
  }
  if(to.fullPath==="/login"){
    localStorage.setItem("path",from.fullPath)
  }
  if(userInfo && to.path==="/login"){
    next("/")
  }
  if(to.path.includes("/checkout") && from.path!=="/shop/car"){
    next("/")
  }
  next()
})


export default router
