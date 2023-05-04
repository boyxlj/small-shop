import React from 'react'
import style from "./style/index.module.scss"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {deleteOrderNumber} from "../../../../api/request"
import { Modal,message,Result,Empty  } from 'antd';
import { useDispatch } from 'react-redux/es/exports'
import {setPayDialog,setOrderNum} from "../../../../store/reducer/global"
import {getDate} from "../../../../utils/time"
const { confirm } = Modal;
export default function ItemList(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = props.data
  const reSearch = props.reSearch
  //跳转详情页
  const tiaoDetail = (detailId)=>{
    navigate(`/details?detailId=${detailId}`)
  }

  //订单详情
  const orderDetail = (orderNumber)=>{
    navigate(`/order/orderDetails?orderNumber=${orderNumber}`)
  }
  //立即支付
  const pay = (orderNumber)=>{
    dispatch(setOrderNum(orderNumber))
    dispatch(setPayDialog(true))
  }
  //删除订单
  const deleteOrder = (orderNumber)=>{
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
          reSearch()
      },
      onCancel() {
      },
    });
  }

  return (
    <>
   {data.length==0 &&
   <Empty style={{marginTop:'80px'}} description="当前没有交易订单" />
   }
 
    {data.length>0 && data?.map(item=>(
      <div key={item.createTime} className={style.list_box}>
      <div  className={style.list_box_top}>
        <div className={style.title}> {item.type=='3'?'已支付成功':'等待付款'}</div>
        <div className={style.info}>
          <div key={item.createTime} className={style.infoLeft}>
          {getDate(item.createTime)} <span>|</span>
          {item.name} <span>|</span>
          订单号: {item.orderNumber} <span>|</span>
          在线支付
          </div>
          <div className={style.infoRight}>
            {item.type=='3'?'已支付':'应付'}金额:<span>{item.totalPrice}.00</span>元
          </div>
        </div>
      </div>
      <div className={style.list_box_bottom}>
        <div className={style.left}>
          {item.orderList?.map(child=>(
          <li key={child.detailId}>
            <img src={child.titleImg} alt="" onClick={()=>tiaoDetail(child.detailId)}/>
            {child.tag && <span className={style.tags}>{child.tag}</span>}
            <div  className={style.shopInfo}>
              <div onClick={()=>tiaoDetail(child.detailId)}>{child.title}</div> 
              <div>{child.price}元 <span>x</span> {child.num}</div> 
            </div>
          </li>
          ))}
        </div>
        <div className={style.right}>
        {item.type!='3'&& <div onClick={()=>pay(item.orderNumber)}>立即付款</div>}
          <div onClick={()=>orderDetail(item.orderNumber)}>订单详情</div>
          <div className={style.cancel} onClick={()=>deleteOrder(item.orderNumber)}>删除订单</div>
        </div>
      </div>
      </div>
      ))}
    </>
      
    
  )
}
