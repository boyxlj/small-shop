import { createSlice } from "@reduxjs/toolkit";
const detailSlice = createSlice({
  name:"detailOrEditor",
  initialState:{
    //编辑基本信息是否显示
    isShowEditorInfo:false,
    //编辑轮播是否显示
    isShowEditorSwiper:false
  },
  reducers:{
    setEditorInfo:(state,{payload})=>{
      state.isShowEditorInfo = payload
    },
    setEditorSwiper:(state,{payload})=>{
      state.isShowEditorSwiper = payload
    }
  }
})

export const {setEditorInfo,setEditorSwiper} = detailSlice.actions
export default detailSlice.reducer