import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "../views/category/store"
import detailReducer from "../views/details/store"
import userReducer from "../views/user/store"
import swiperReducer from "../views/swiper/store"

export default configureStore({
  reducer:{
    category:categoryReducer,
    detailOrEditor:detailReducer,
    user:userReducer,
    swiperOrEditor:swiperReducer,
  }
})