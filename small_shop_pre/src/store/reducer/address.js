import { createSlice } from "@reduxjs/toolkit";
import {selectAddressAll,updateAddress,addAddress} from "../../api/request"
import { message } from "antd";
const address = createSlice({
  name:"address",
  initialState:{
    allAddress:[],    //全部收获地址
    defaultAddress:[],   //默认收获地址
    addressDialog:false,    //控制编辑或添加收货地址对话框
    isEditor:null,    //是否展示添加收获地址
    submitBtnDisable:false,   //控制提交按钮是否禁用
    selectAddressDialog:false   //是否显示选择地址对话框
  },
  reducers:{
    //控制编辑或添加收货地址对话框
    setAddressDialog: (state, { payload }) => {
      state.addressDialog = payload.isShow
      state.isEditor = payload.addressId?payload.addressId:null
    },
    setAddress:(state,{payload})=>{
      state.allAddress = payload.data
      state.defaultAddress = payload.default
    },
     //控制提交按钮是否禁用
    setSubmitBtn:(state,{payload})=>{
      state.submitBtnDisable = payload
    },
    //是否显示选择地址对话框    
    setSelectAddress:(state,{payload})=>{
      state.selectAddressDialog = payload
    },
  }
})

//查询用户所有收货地址
export const selectAddressAlls = (payload)=>{
  return async (dispatch,getState)=>{
    const userId = getState().userInfo.userId
    const {data:res} = await selectAddressAll(userId) 
    if(res.code!=200)  dispatch(setAddress({default:[],data:[]}))
    dispatch(setAddress({default:res.default,data:res.data}))
  }
}

//添加收货地址
export const addAddresss = (payload)=>{
  return async (dispatch,getState)=>{
    const userId = getState().userInfo.userId
    const {data:res} = await addAddress({userId,...payload}).finally(()=>dispatch(setSubmitBtn(false)))
    if(res.code!=200) return message.error("添加收货地址失败")
    message.success("添加收货地址成功")
    dispatch( setAddressDialog({isShow:false}))
    selectAddressAlls()
    dispatch(selectAddressAlls())
  }
}
//修改收货地址
export const updateAddresss = (payload)=>{
  return async (dispatch,getState)=>{
    const {data:res} = await updateAddress(payload).finally(()=>dispatch(setSubmitBtn(false)))
    if(res.code!=200) return message.error("修改收货地址失败")
    message.success("修改收货地址成功")
    dispatch( setAddressDialog({isShow:false}))
    dispatch(selectAddressAlls())
  }
}

export const {
  setAddress,
  setAddressDialog,
  setSubmitBtn,
  setSelectAddress,
} = address.actions

export default address.reducer