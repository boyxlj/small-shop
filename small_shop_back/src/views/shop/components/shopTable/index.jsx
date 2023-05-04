import React from 'react'
import { Button,Tag, Table, message, Popconfirm } from 'antd';
import style from "./style/index.module.scss"
import { getDate } from "../../../../utils/time"
import { deleteCategory } from "../../../../api/request"
import { useNavigate } from 'react-router-dom';
import {authControl} from "../../../../utils/authControl"
export default function ShopTable(props) {
  const { shopData,pageOn,getPageOn, reLoad,loading } = props
  const navigate = useNavigate()
  const columns = [
    {
      title: '序号',
      dataIndex: 'detailId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '商品图片',
      dataIndex: 'titleImg',
      render: (text) => (
        <img style={{width:'80px',height:'80px',objectFit:"cover"}} src={text} alt="" />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      width:130,
      render:(value,a)=>(
        <div 
        className={style.titles} 
        onClick={()=>navigate(`/details?detailId=${a.detailId}`)}>
          {value}
          </div>
      )
    },
    {
      title: '商品简介',
      dataIndex: 'descs',
      width:130,
    },
    {
      title: '原价',
      dataIndex: 'prePrice',
      render:(value)=>{
       return Number(value)?<Tag color="geekblue">{value}元</Tag>:<Tag color="geekblue">未标注原价</Tag>
      }
    },
    {
      title: '现价',
      dataIndex: 'price',
      render:(value)=>(
        <Tag color="magenta">{value}元</Tag>
      )
    },
    {
      title: '标签',
      dataIndex: 'tag',
      render:(value)=>{
       return value?<Tag color="blue">{value}</Tag>:<span>/</span>
      }
    },
    {
      title: '上架时间',
      dataIndex: 'createTime',
      render: (value) => getDate(value)
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button type="text" onClick={() => detail(record.detailId)} className={style.editor}>详情</Button>
          <Button type="text" onClick={() => editor(record.detailId)} className={style.editor}>编辑</Button>
          <Popconfirm
            title="你确定将永久删除当前商品吗?"
            onConfirm={() => deletes(record.detailId)}
            okText="是的"
            cancelText="再想想"
          >
            <Button type="text"  className={style.delete}>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  //编辑按钮
  const editor = (detailId) => {
    navigate(`/details?detailId=${detailId}`)
  }
  //删除按钮
  const deletes = async (detailId) => {
    if(!authControl()) return 
    const { data: res } = await deleteCategory(detailId)
    if (res.code != 200) return message.error("删除失败")
    reLoad()
    message.success("删除成功")
  }
  //跳转详情
  const detail = (detailId)=>{
    navigate(`/details?detailId=${detailId}`)
  }
  return (
    <Table loading={loading} pagination={
      {
        onChange:(value)=>{
          document.documentElement.scrollTop=0
          getPageOn(value)
        },
        current:pageOn,
        defaultCurrent:1,
        hideOnSinglePage:true
      }
    } columns={columns}  rowKey="detailId" dataSource={shopData} />
  )
}
