import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"
import { authControl } from "../utils/authControl"
import Authorization from "../components/common/Authorization"
import NotFound from "../views/notFound"
let data = [
  { path: "/", element: <Suspense fallback={<p></p>}><Authorization><Navigate to="small-shop/statistics" /></Authorization></Suspense> },
  { path: "/small-shop/statistics", element: LazyLoad("welcome") },
  { path: "/user", element: LazyLoad("user") },
  { path: "/swiper", element: LazyLoad("swiper") },
  { path: "/details", element: LazyLoad("details") },
  { path: "/category", element: LazyLoad("category") },
  { path: "/shop", element: LazyLoad("shop") },
  { path: "/editor", element: LazyLoad("editor") },
  { path: "/order", element: LazyLoad("order") },
  { path: "/login", element: LazyLoad("login", false) },
  { path: "/notFount", element: <NotFound /> },
  { path: "*", element: <Navigate to="notFount" /> },
]

if (!authControl(false)) {
  data = data.filter(item => item.path != "/user")
}


export default data

function LazyLoad(path, isAuth = true) {
  const Component = lazy(() => import(`../views/${path}`))
  return (

    <Suspense fallback={<p></p>}>
      {isAuth ?
        <Authorization><Component /></Authorization>
        : <Component />}
    </Suspense>

  )
}
