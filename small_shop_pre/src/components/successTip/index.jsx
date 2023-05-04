import React from 'react'
import {  Modal,Result,Button } from 'antd';
import {useDispatch,useSelector} from "react-redux"
import { setSuccessTip} from '../../store/reducer/global';
import { useNavigate } from 'react-router-dom';
import style from "./style/index.module.scss"
export default function SuccessTip (){
  const dispatch = useDispatch()
  const successDialogTip = useSelector(state=>state.global.successDialogTip) 
  const TipText = useSelector(state=>state.global.TipText) 
  const isShowCar = useSelector(state=>state.global.isShowCar) 
  const navigate = useNavigate()
  const handleOk = () => {
    setSuccessTip(false);
  };

  const handleCancel = () => {
    dispatch(setSuccessTip({
      successDialogTip:false,
    }))
  };

  //返回上一级
  const back = ()=>{
    dispatch(setSuccessTip({
      successDialogTip:false,
    }))
  }

  //跳转购物车
  const tiaoCar= ()=>{
    dispatch(setSuccessTip({
      successDialogTip:false,
    }))
    navigate("/car")
  }

  //跳转我的订单
  const tiaoOrer= ()=>{
    dispatch(setSuccessTip({
      successDialogTip:false,
    }))
    navigate("/order/orderList?orderTabsParams=allOrders",{replace:true})
  }
  return (
    <>
      <Modal style={{userSelect:"none"}} centered={true} closable={false} keyboard={false} maskClosable={false} footer={null} visible={successDialogTip} onOk={handleOk} onCancel={handleCancel}>
      <Result status="success" title={TipText}/>
      {isShowCar?(<div className={style.btns}><Button key="buy" onClick={back}>返回上一级</Button>
      <Button type="primary" className={style.goCar} onClick={tiaoCar} key="console">
        去购物车结算
      </Button></div>):(<div className={style.btns}> 
         <Button type="primary" onClick={tiaoOrer} key="console">
         查看订单详情
       </Button></div>
      )}
      </Modal>
    </>
  );
};

