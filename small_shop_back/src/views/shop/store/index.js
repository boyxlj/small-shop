import { createSlice } from "@reduxjs/toolkit";
export const categorySlice = createSlice({
  name:"category",
  initialState:{
    isShow:false,
    detailId:null
  },
  reducers:{
    changeIsShow:(state,{payload})=>{
      const {isShow,detailId} = payload
      state.isShow = isShow
      state.detailId = detailId?detailId:null

    }
  }
})

export const {changeIsShow}= categorySlice.actions
export default categorySlice.reducer