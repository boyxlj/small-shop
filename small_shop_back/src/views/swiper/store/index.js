import { createSlice } from "@reduxjs/toolkit";
const swiperSlice = createSlice({
  name:"swiperOrEditor",
  initialState:{
    //编辑轮播是否显示
    isShowEditorSwiper:false
  },
  reducers:{
    setEditorSwiper:(state,{payload})=>{
      state.isShowEditorSwiper = payload
    }
  }
})

export const {setEditorSwiper} = swiperSlice.actions
export default swiperSlice.reducer