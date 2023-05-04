import { createSlice } from "@reduxjs/toolkit";
const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    userId:"",
    username:"",
    name:"",
    avatar:"",
    sex:"",
    city:"",
    register_time:"",
    email:"",
    status:"",
    phone:""
  },
  reducers:{
    setUserInfo(state,{payload}){
        state.userId=payload.userId,
        state.username=payload.username,
        state.name=payload.name,
        state.avatar=payload.avatar,
        state.sex=payload.sex,
        state.city=payload.city,
        state.register_time=payload.register_time,
        state.email=payload.email,
        state.status=payload.status,
        state.phone=payload.phone
    }
  }
})

export const {setUserInfo} = userInfo.actions
export default userInfo.reducer