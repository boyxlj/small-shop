import { Button, Modal } from 'antd';
import { useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { setPayDialog,setSuccessTip,setOrderNum } from '../../store/reducer/global';
import style from "./style/index.module.scss"
import {palImg} from "../../api/other"
import {setOrderState} from "../../api/request"
export default function PayDialog () {
  const dispatch = useDispatch()
  const [payLoading,setPayLoading]= useState(false)
  let [timer,setTimer]= useState(null)
  const payDialog = useSelector(state=>state.global.payDialog)
  const orderNum = useSelector(state=>state.global.orderNum)

  const handleCancel = () => {
    if(timer){
      clearInterval(timer)
      setPayLoading(false)
      setTimer(null)
      return
    }
    dispatch(setPayDialog(false))
    dispatch(setOrderNum(""))
  };
    
  const paySuccess = ()=>{
    setPayLoading(true)
    timer = setTimeout(async()=>{
      setPayLoading(false)
      dispatch(setPayDialog(false))
      dispatch(setSuccessTip({
          successDialogTip: true,  //加入购物车成功的提示
          TipText:"恭喜您！支付成功！",
          isShowCar:false
        }))
        setTimer(null)
        dispatch(setOrderNum(""))
        await setOrderState(orderNum,"3")
        window.location.reload()
    },4000)
    setTimer(timer)
  }

  //设置商品为待发货状态

  return (
      <Modal centered={true} title="请扫码支付" closable={false} style={{textAlign:"center"}}  keyboard={false} maskClosable={false} footer={null} visible={payDialog} onCancel={handleCancel}>
       <div className={style.payImg}>
        <img src={palImg} alt="" />
       </div>
       <div className={style.btns}>
        <Button onClick={handleCancel} className={style.cancel}>取消支付</Button>
        <Button style={{backgroundColor:"#CF0A2C",color:"#fff"}} color='#CF0A2C' onClick={paySuccess} loading={payLoading} className={style.success}>{payLoading?"支付校验中...":"我已支付"}</Button>
       </div>
      </Modal>
  );
};
