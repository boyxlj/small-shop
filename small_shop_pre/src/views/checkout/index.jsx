import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import { confirmOrder, setOrdererAddress, deleteOrderNumber } from "../../api/request"
import { useSelector, useDispatch } from "react-redux"
import { message, Tag, Spin } from 'antd'
import { selectAddressAlls, setAddressDialog, setSelectAddress } from "../../store/reducer/address"
import { setCarTotal, setRemoveCar } from "../../store/reducer/global"
import style from "./style/index.module.scss"
import { SelectOutlined, FolderAddOutlined, EditOutlined } from '@ant-design/icons';
export default function Checkout() {
  const dispatch = useDispatch()
  const defaultAddress = useSelector(state => state.address.defaultAddress)
  const allAddress = useSelector(state => state.address.allAddress)
  const removeCarList = useSelector(state => state.global.removeCarList)
  const userId = useSelector(state => state.userInfo.userId)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [orderList, setOrderList] = useState([])  //订单列表
  const [orderTprice, setOrderTprice] = useState(0)  //订单总价格
  const [totalNum, setTotalNum] = useState(0)  //订单总数量、件数
  const [loading, setLoading] = useState(true)
  const orderNumber = params.get("orderNumber")
  useEffect(() => {
    setLoading(true)
    document.documentElement.scrollTop = 0
    getOrderList()
    getAddress()
  }, [])

  //获取订单列表
  const getOrderList = async () => {
    const { data: res } = await confirmOrder(orderNumber).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 400);
    })
    if (res.code != 200) {
      message.warning("数据获取异常")
      setOrderList([])
      navigate("/")
      return
    }
    setOrderList(res.data)
    setOrderTprice(res.totalPrice)
    setTotalNum(res.totalNum)
  }
  //查询用户收藏地址
  const getAddress = async () => {
    dispatch(selectAddressAlls())
  }
  //编辑收货地址
  const editorAddress = (addressId) => {
    dispatch(setAddressDialog({
      isShow: true,
      addressId,
    }))
  }
  //添加收货地址
  const addAddress = () => {
    dispatch(setAddressDialog({
      isShow: true,
    }))
  }
  //选择收货地址
  const selectAddress = () => {
    dispatch(setSelectAddress(true))
  }
  //返回购物车
  const goBackCar = async () => {
    //删除订单
    await deleteOrderNumber(orderNumber)
    navigate("/car")
  }
  //立即下单
  const goPay = async () => {
    if (!defaultAddress?.length) return message.warning("请选择收货地址")
    const { data: res } = await setOrdererAddress(orderNumber, defaultAddress[0].addressId, removeCarList, "2")
    if (res.code != 200) return
    dispatch(setCarTotal(userId))
    dispatch(setRemoveCar(null))
    navigate(`/confirm?orderNumber=${orderNumber}`, { replace: true })
  }
  return (
    <div className={style.box}>
      {loading && (
        <div className={style.loading} style={{ padding: loading ? '250px 0' : '0' }}>
           <Spin size='large' />
        </div>
      )}
      {!loading && (
        <>
          <h1 className={style.confirm}>确认订单</h1>
          <div className={style.checkout}>
            <div className={style.address}>
              <div className={style.titles}>收货地址</div>
              <div className={style.detail}>
                {defaultAddress?.length > 0 ? (<ul>
                  <li><span>收货人:</span>{defaultAddress[0].name}</li>
                  <li><span>联系电话:</span>{defaultAddress[0].phone}</li>
                  <li className={style.addressDetails}><span>收货地址:</span>{defaultAddress[0].detailAddress}</li>
                  <span style={{ display: "inline-block", marginTop: "15px", cursor: "pointer" }} onClick={() => editorAddress(defaultAddress[0].addressId)}>
                    <Tag color="red"><EditOutlined className={style.icons} />编辑当前地址</Tag>
                  </span>
                </ul>) : (<ul onClick={selectAddress} className={style.emptyAddress}>请选择收货地址</ul>)}
                <div className={style.btn}>
                  <p onClick={selectAddress}>
                    <Tag color="cyan"><SelectOutlined className={style.icons} />选择地址</Tag>
                  </p>
                  <p onClick={addAddress}>
                    <Tag color="purple"><FolderAddOutlined className={style.icons} />添加地址</Tag>
                  </p>
                </div>
              </div>

            </div>
            <div className={style.shopDetail}>
              <div className={style.titles}>商品及优惠券</div>
              <div className={style.shopTitle}>
                {orderList?.map(item => (
                  <li key={item.orderId}><p><img src={item.titleImg} alt="" />
                  {item.title}
                  {item.tag&&<span >{item.tag}</span>}
                  
                  </p>
                    <p>{item.price}元*{item.num}</p><p>{item.singleTotalPrice}</p></li>
                ))}
              </div>
            </div>
            <div className={style.send}>
              <p><span className={style.titles}>配送方式</span><span>包邮</span></p>
            </div>
            <div className={style.footer}>
              <div className={style.top}>
                <p className={style.titles}>发票</p>
                <p className={style.topRight}>
                  <span>电子普通发票</span>
                  <span>个人</span>
                  <span>商品明细</span>
                </p>
              </div>
              <div className={style.bottom}>
                <div className={style.bottomLeft}>
                  <p><span>+</span>使用优惠券 <span style={{ marginLeft: "18px" }}>无可用</span></p>
                  <p><span>+</span>使用微商城专属礼品卡</p>
                </div>
                <div className={style.bottomRight}>
                  <li><p>商品件数: </p><p>{totalNum}件</p></li>
                  <li><p>商品总价: </p><p>{orderTprice}元</p></li>
                  <li><p>活动优惠: </p><p>-0元</p></li>
                  <li><p>优惠券抵扣: </p><p>-0元</p></li>
                  <li><p>运费: </p><p>0元</p></li>
                  <li><p>应付总额: </p><p><span>{orderTprice}</span>元</p></li>
                </div>
              </div>
              <div className={style.btns}>
                <div onClick={goBackCar} className={style.backCar}>返回购物车</div>
                <div onClick={goPay} className={style.goPay}>立即下单</div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
