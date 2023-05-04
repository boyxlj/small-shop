import { createSlice } from "@reduxjs/toolkit";

const indexSwiper = createSlice({
  name:"indexSwiper",
  initialState:{
    indexSwiperList:[]
  },
  reducers:{
    setIndexSwiper:(state,{payload})=>{
      state.indexSwiperList = payload
    }
  }
})


export const {setIndexSwiper} = indexSwiper.actions
export default indexSwiper.reducer
