import { createSlice } from '@reduxjs/toolkit'
export const loginSlice = createSlice({
  name: 'loginDialog',
  initialState: {
    isShowLogin: false,
    isShowRegister:false,
    sureLogin:false,
    fullPath:"",
  },
  reducers: {
    changeLoginDialogShow: (state) => {
      state.isShowLogin  = !state.isShowLogin
    },
    changeRegisterDialogShow: (state) => {
      state.isShowRegister  = !state.isShowRegister
    },
    isSureLogin: (state) => {
      state.sureLogin  = !state.sureLogin
    },
    setPrePath: (state,{payload}) => {
      state.fullPath  = payload
    },
  },
})

export const { 
  changeLoginDialogShow,
  changeRegisterDialogShow,
  isSureLogin,
  setPrePath 
} = loginSlice.actions

export default loginSlice.reducer
