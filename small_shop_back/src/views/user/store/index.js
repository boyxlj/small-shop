import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name:"user",
  initialState:{
    isShow:false,
    userId:null
  },
  reducers:{
    changeIsShow:(state,{payload})=>{
      const {isShow,userId} = payload
      state.isShow = isShow
      state.userId = userId?userId:null

    }
  }
})

export const {changeIsShow}= userSlice.actions
export default userSlice.reducer