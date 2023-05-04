import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import UpdateTitle from '../../components/updateTitle'
import style from "./style/index.module.scss"
import AllOrder from "./components/allOrder"
import AwaitPay from "./components/awaitPay"
import AwaitShou from "./components/awaitShou"
import Recyle from "./components/recyle"
import { useSearchParams ,useNavigate} from 'react-router-dom'
export default function OrderList() {
  const navigate = useNavigate()
  const menus = [
    {id:0,path:"allOrders",name:"全部有效订单"},
    {id:2,path:"obligations",name:"待付款"},
    {id:3,path:"awaitReceiving",name:"待收货"},
    {id:4,path:"awaitEvaluate",name:"待评价"},
    {id:5,path:"refund",name:"退款/售后"},
    {id:6,path:"recyle",name:"订单回收站"},
  ]
  const [selectState,setSelectState] = useState(menus[0].path)
  const [params] = useSearchParams()
  useEffect(()=>{
    document.documentElement.scrollTop=0
    const orderTabsParams = params.get("orderTabsParams")
    const isTrue=menus.some((item) => item.path.includes(orderTabsParams))
    if(!isTrue) return navigate(`/order/orderList?orderTabsParams=allOrders`,{replace:true})
    if(!orderTabsParams){
      navigate(`/order/orderList?orderTabsParams=allOrders`,{replace:true})
      setSelectState("allOrders")
    }else{
      setSelectState(orderTabsParams)
    }
  },[params.get("orderTabsParams")])
  //点击选项
  const clickOrder = async(value)=>{
    setSelectState(value)
    navigate(`/order/orderList?orderTabsParams=${value}`)
  }

  return (
    <div>
       <UpdateTitle title="我的订单"/>
      <div className={style.orderList}>
        <p className={style.title}>我的订单</p>
      <div className={style.select}>
        {menus.map(item=>(
          <li onClick={()=>clickOrder(item.path)} key={item.id} className={selectState==item.path?style.liActive:""}>
            {item.name}
          </li>
        ))}
      </div>
      {selectState==menus[0].path && <AllOrder />}
        {selectState==menus[1].path && <AwaitPay />}
        {selectState==menus[2].path && <AwaitShou />}
        {selectState==menus[3].path && <Recyle/>}
        {selectState==menus[4].path && <Recyle/>}
        {selectState==menus[5].path && <Recyle/>}
      </div>
    </div>
  )
}
