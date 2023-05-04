import { createSlice } from "@reduxjs/toolkit";

const pageNation = createSlice({
  name:"pageNation",
  initialState:{
    pageOn:1,
    pageCount:8,
    pageTotal:0
  },
  reducers:{
    setPageOn:(state,{payload})=>{
      state.pageOn = payload
    },
    setPageCount:(state,{payload})=>{
      state.pageCount = payload
    },
    setPageTotal:(state,{payload})=>{
      state.pageTotal = payload
    },
  }
})

export const {setPageOn,setPageTotal,setPageCount} = pageNation.actions
export default pageNation.reducer