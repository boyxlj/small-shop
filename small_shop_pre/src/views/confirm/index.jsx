import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import style from "./style/index.module.scss"
import { confirmPayOrder } from "../../api/request"
import { message, Spin } from 'antd'
import { useDispatch } from 'react-redux/es/exports'
import { setPayDialog, setOrderNum } from "../../store/reducer/global"
export default function Confirm() {
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const orderNumber = params.get("orderNumber")
  const [loading, setLoading] = useState(true)
  let [orderInfo, setOrderInfo] = useState([])
  let [totalPrice, setTotalPrice] = useState(0)
  let [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    phone: ""
  })
  useEffect(() => {
    setLoading(true)
    document.documentElement.scrollTop = 0
    getOrderInfo()
  }, [])
  //确认订单查询
  const getOrderInfo = async () => {
    const { data: res } = await confirmPayOrder(orderNumber).finally(()=>{
      setTimeout(()=>{
        setLoading(false)
      },400)
    })
    if (res.code != 200) return message.error("信息获取失败")
    setOrderInfo(res.data)
    setTotalPrice(res.totalPrice)
    setAddressInfo({
      name: res.data[0].name,
      address: res.data[0].detailAddress,
      phone: res.data[0].phone,
    })
  }
  //点击支付
  const pay = (value) => {
    dispatch(setOrderNum(orderNumber))
    dispatch(setPayDialog(true))
  }
  return (
    <div className={style.box}>
      {loading && (
        <div className={style.loading} style={{ padding: loading ? '220px 0' : '0' }}>
           <Spin size='large' />
        </div>
      )}
      {!loading && (
        <div className={style.confirm}>
          <h1>支付订单</h1>
          <div className={style.order}>
            <div className={style.order_top}>
              <img src="https://api.helloxlj.top/public/static/file1656809252507413913019.png" alt="" />
              <div className={style.order_top_right}>
                <div className={style.tip}>
                  <h2>订单提交成功！去付款咯~~</h2>
                  <p>请在<span>0小时15分</span>内完成支付，超时后将取消订单</p>
                </div>
                <div className={style.price}>
                  <p>应付总额：<span>{totalPrice}元</span></p>
                </div>
              </div>
            </div>
            <div className={style.order_bottom}>
              <li><span>订单号:</span>{orderNumber}</li>
              <li><span>收货信息:</span>{addressInfo.name} {addressInfo.phone} {addressInfo.address}

              </li>
              <li><span>商品名称:</span>{
                orderInfo.map(item => (item.title  + " x" + item.num))
              }</li>
              <li><span>发票信息:</span>电子普通发票 个人</li>
            </div>
          </div>
          <div className={style.pay}>
            <h3>请选择以下支付方式进行付款</h3>
            <h3>支付平台</h3>
            <div className={style.pay_other}>
              <div onClick={() => pay(0)}><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png" alt="" /></div>
              <div onClick={() => pay(0)}><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9a4f743d0bdb5c048ad9803914a4ea83.jpg" alt="" /></div>
              <div onClick={() => pay(0)}><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg" alt="" /></div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
