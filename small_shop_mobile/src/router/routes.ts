import { RouteRecordRaw } from "vue-router"
const Shop = () => import("@/views/shop/index.vue")
const Home = () => import("@/views/home/index.vue")
const Category = () => import("@/views/category/index.vue")
const Car = () => import("@/views/car/index.vue")
const Profile = () => import("@/views/profile/index.vue")
const Details = () => import("@/views/details/index.vue")
const Search = () => import("@/views/search/index.vue")
const Collect = () => import("@/views/collect/index.vue")
const Order = () => import("@/views/order/index.vue")
const Login = () => import("@/views/login/index.vue")
const Checkout = () => import("@/views/checkout/index.vue")
const About = () => import("@/views/about/index.vue")

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/shop/home"
  },
  {
    path: "/shop",
    component: Shop,
    children: [
      {
        path: "home",
        component: Home,
        meta: { keepAlive: true }
      },
      {
        path: "category",
        component: Category,
        meta: { keepAlive: true }
      },
      {
        path: "car",
        component: Car,
        // meta: { keepAlive: true }
      },
      {
        path: "profile",
        component: Profile,
        meta: { keepAlive: true }
      },
    ]
  },
  { path: "/details", component: Details },
  { path: "/search", component: Search, meta: { keepAlive: true } },
  { path: "/collect", component: Collect ,meta: { keepAlive: true }},
  { path: "/order", component: Order,meta: { keepAlive: true } },
  { path: "/login", component: Login },
  { path: "/checkout", component: Checkout },
  { path: "/about", component: About },

]
