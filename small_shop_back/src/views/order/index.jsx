import React from 'react'
import OrderTable from './components/orderTable'
import {selectAllOrder} from "../../api/request"
import { useState } from 'react'
import { useEffect } from 'react'
import {Select} from "antd"
import style from "./style/index.module.scss"
const { Option } = Select;
export default function Order() {
  const [orderData,setOrderData] = useState([])
  const [pageOn,setPageOn] = useState(1)
  const [select,setSelect] = useState(null)
  const [loading,setLoading] =useState(false) 
  

  useEffect(()=>{
    setLoading(true)
    const storePageOn = sessionStorage.getItem("OrderListPage")
    if(storePageOn){
      setPageOn(storePageOn)
    }else{
      setPageOn(1)
    }
    getOrderData()
  },[select])

  //获取订单列表
  const getOrderData = async ()=>{
    const {data:res} = await selectAllOrder(select).finally(()=>{
      setLoading(false)
  })
    if(res.code!=200) return setOrderData([])
    setOrderData(res.data)
  }


  //添加或者修改后更新数据
  const reLoad = ()=>{
    getOrderData()

  }

  //点前所在的页面
  const getPageOn = (value)=>{
    sessionStorage.setItem("OrderListPage",value)
    setPageOn(value)
  }

  const handleChange = (value) => {
    setSelect(value)
  };
  return (
    <div>
      <div className={style.add}>

      <Select
      defaultValue="0"
      style={{
        width: 120,
        marginRight: 100
      }}
      onChange={handleChange}
    >
      <Option value="0">全部</Option>
      <Option value="2">待付款</Option>
      <Option value="3">待收货</Option>
    </Select>
      </div>
      <OrderTable loading={loading} getPageOn={(value)=>getPageOn(value)} pageOn={pageOn}  reLoad={reLoad} orderData={orderData}/>
    </div>
  )
}
