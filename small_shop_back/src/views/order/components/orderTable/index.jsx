import React from 'react'
import { Button,Tag, Table, message, Popconfirm } from 'antd';
import style from "./style/index.module.scss"
import { getDate } from "../../../../utils/time"
import { deleteOrder } from "../../../../api/request"
import { useNavigate } from 'react-router-dom';
import {authControl} from "../../../../utils/authControl"
export default function OrderTable(props) {
  const { orderData,pageOn,getPageOn, reLoad,loading} = props
  const navigate = useNavigate()

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
    },
    {
      title: '购买用户',
      dataIndex: 'name',
    },
    {
      title: '支付金额',
      dataIndex: 'totalPrice',
      render:(value)=>(
        <Tag color="blue">{value}元</Tag>
      )
    },
    {
      title: '订单状态',
      dataIndex: 'type',
      render:(value)=>(
        value==2? (<Tag color="purple">· 待付款</Tag>):(<Tag color="red">· 待收货</Tag>)
      )
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      render:(value)=>(getDate(value))
    },
    {
      title: '操作',
      render:(value,record)=>(
        <>
          {/* <Button type="text" onClick={() => detail(record.orderNumber)} className={style.editor}>详情</Button> */}
          <Popconfirm
            title="你确定将永久删除该订单吗?"
            onConfirm={() => deletes(record.orderNumber)}
            okText="是的"
            cancelText="再想想"
          >
            <Button type="text"  className={style.delete}>删除</Button>
          </Popconfirm>
        </>
      )
    },
  ];
  
  //订单详情
  const detail = (detailId)=>{
    navigate(`/details?detailId=${detailId}`)
  }

  //删除订单
  const deletes = async (orderNumber) => {
    if(!authControl()) return 
    const { data: res } = await deleteOrder(orderNumber)
    if (res.code != 200) return message.error("删除失败")
    reLoad()
    message.success("删除成功")
  }

  return (
    <Table
    loading={loading}
    pagination={
      {
        onChange:(value)=>{
          document.documentElement.scrollTop=0
          getPageOn(value)
        },
        current:pageOn,
        defaultCurrent:1,
        hideOnSinglePage:true
      }
    } 
    columns={columns}
    rowKey="orderNumber"
    expandable={{
      expandedRowRender: (record) => (
        <div
          style={{
            margin: 0,
          }}
          className={style.content}
        >
          {record.orderList?.map(item=>(
            <div key={item.orderId} className={style.item}>
              <img src={item.titleImg} alt="" />
              <div onClick={()=>detail(item.detailId)} className={style.title}>{item.title}</div>
              <div className={style.number}>{item.price}元<span>x{item.num}</span></div>
              <div className={style.price}><span>{item.price*item.num}</span>元</div>
              </div>
          ))}
          <div className={style.state}>
            <li><span>订单状态:</span>{record.type==2? (<Tag color="purple">· 待付款</Tag>):(<Tag color="red">· 待收货</Tag>)}</li>
          </div>
          <div className={style.address}>
            <li><span>收件人:</span>{record.name}</li>
            <li><span>联系电话:</span>{record.orderList[0].phone}</li>
            <li><span>收货地址:</span>{record.orderList[0].detailAddress}</li>
            <li><span>订单创建时间:</span>{getDate(record.createTime)}</li>
          </div>
        </div>
      ),
      // rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    dataSource={orderData}
  />
  )
}
