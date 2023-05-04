import { createSlice } from "@reduxjs/toolkit";
import { selectCarTotal } from "../../api/request"
const global = createSlice({
  name: "global",
  initialState: {
    successDialogTip: false,  //加入购物车成功的提示
    TipText: "",
    isShowCar: false,
    carTotal: 0,
    payDialog: false,   // 支付对话框
    removeCarList: null,   //待移除订单
    orderNum: ""   //订单号
  },
  reducers: {
    setSuccessTip: (state, { payload }) => {
      const { successDialogTip, TipText, isShowCar } = payload
      state.successDialogTip = successDialogTip
      state.TipText = TipText
      state.isShowCar = isShowCar
    },
    updateCarTotal: (state, { payload }) => {
      state.carTotal = payload ? payload : 0
    },
    setPayDialog: (state, { payload }) => {
      state.payDialog = payload
    },
    setRemoveCar: (state, { payload }) => {
      state.removeCarList = payload
    },
    setOrderNum: (state, { payload }) => {
      state.orderNum = payload
    },
  }
})

export const setCarTotal = (payload) => {
  return async (dispatch, getState) => {
    const { data: res } = await selectCarTotal(payload)
    if (res.code != 200) return dispatch(updateCarTotal(0))
    dispatch(updateCarTotal(res.total))
  }
}
export const { setSuccessTip, updateCarTotal, setOrderNum, setPayDialog, setRemoveCar } = global.actions
export default global.reducer 