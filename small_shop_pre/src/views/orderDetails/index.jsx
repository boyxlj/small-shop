import React from 'react'
import { useSearchParams } from 'react-router-dom'
import style from "./style/index.module.scss"
import UpdateTitle from "../../components/updateTitle"
import { useState } from 'react'
import { Modal,message,Spin } from 'antd'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import {selectUserOrderDetail,deleteOrderNumber} from "../../api/request"
import { useDispatch } from 'react-redux/es/exports'
import {setPayDialog,setOrderNum} from "../../store/reducer/global"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getDate} from "../../utils/time"
const { confirm } = Modal;
export default function OrderDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const orderNumber = params.get("orderNumber")
  const [data,setData] = useState([])
  const [info,setInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [createTime, setCreateTime] = useState('')
  useEffect(()=>{
    document.documentElement.scrollTop=0
    getData()
  },[])
    //获取订单详情列表
    const getData = async()=>{
      setLoading(true)
      const {data:res} = await selectUserOrderDetail(orderNumber).finally(()=>{
        setTimeout(() => {
          setLoading(false)
        }, 500);
      })
      if(res.code!=200) {
        message.error("数据获取异常")
        navigate(-1,{replace:true})
        setData([])
        return
      }
      setCreateTime(res.data[0].orderList[0].createTime)
      setData(res.data[0].orderList)
      setInfo(res.data[0].info)
    } 
    //跳转详情页
  const tiaoDetail = (detailId)=>{
    navigate(`/details?detailId=${detailId}`)
  }
  //立即支付
  const pay = ()=>{
    dispatch(setOrderNum(orderNumber))
    dispatch(setPayDialog(true))
  }
  //删除订单
  const deleteOrder = ()=>{
    confirm({
      title: '您确定将永久删除当前订单吗?',
      icon: <ExclamationCircleOutlined />,
      content: '此操作不可恢复',
      okText:"确定",
      cancelText:"取消",
      keyboard:false,
      centered:true,
      async onOk() {
        const {data:res} = await deleteOrderNumber(orderNumber)
        if(res.code!=200) return message.error("删除订单失败")
        message.success("删除订单成功")
        navigate(-1,{replace:true})
      },
    });
  }

  return (
    <div className={style.box}>
      <UpdateTitle title="订单详情"/>
      {loading &&(
        <div className={style.loading} style={{padding:loading?'220px 0':'0'}}>
        <Spin />
      </div>
      )}
      {
        !loading&&(
          <div>
      <div className={style.top}>
        <h1>订单详情</h1>
        <div className={style.btns}>
          <p>订单号：{orderNumber}</p>
          <p style={{marginLeft:'-100px'}}>订单创建时间：{getDate(createTime)}</p>
          <div className={style.btn}>
          <div className={style.cancel} onClick={deleteOrder}>删除订单</div>
          {info[0]?.type=="2" && (<div className={style.lijipay} onClick={pay}>立即付款</div>)}
          </div>
        </div>
      </div>
      {data?.map((item,index)=>(
      <div key={index} className={style.shopList}>
        <img src={item.titleImg} alt="" onClick={()=>tiaoDetail(item.detailId)} />
        {item.tag&&<span className={style.tag}>{item.tag}</span>}
        <div onClick={()=>tiaoDetail(item.detailId)} className={style.title}>{item.title}</div>
        <div className={style.price1}>{item.price}元<span>x</span>{item.num} </div>
      </div>
      ))}
      {info?.map((item,index)=>(
      <div key={index} className={style.address}>
        <h3>收货信息</h3>
        <li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>{item.name}</li>
        <li><span>联系电话:</span>{item.phone}</li>
        <li><span>收货地址:</span>{item.address}</li>
      </div>

      ))}
      <div className={style.pays}>
        <h3>支付方式</h3>
        <p>支付方式 :  <span>在线支付</span></p>
      </div>
      <div className={style.ticket}>
        <h3>发票信息</h3>
        <li><span>发票类型:</span>电子普通发票</li>
        <li><span>发票内容:</span>购买商品明细</li>
        <li><span>发票抬头:</span>个人</li>
      </div>
      <div className={style.price}>
        <li>总价: <span>{info[0]?.totalPrice}.00元</span> </li>
        <li>运费: <span>0元</span> </li>
      </div>
      <div className={style.totalPrice}>应付金额:<span>{info[0]?.totalPrice}.00</span>元 </div>
      </div>
        )
      }
    </div>
  )
}
