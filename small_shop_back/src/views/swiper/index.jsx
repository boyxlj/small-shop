import React,{useState,useEffect} from 'react' 
import { Button ,Table} from 'antd'
import { useDispatch } from 'react-redux'
import {setEditorSwiper} from "./store"
import UpdateIndexSwiperModel from './components/updateSwiperModel'
import {selectIndexSwiper} from "../../api/request"
export default function Swiper() {
  const dispatch = useDispatch()
  const [data,setData] =useState([]) 
  const [loading,setLoading] =useState(false) 

  useEffect(()=>{
    setLoading(true)
    getSwiperData()
  },[])
  //获取商品信息
  const getSwiperData = async()=>{
    const {data:res} = await selectIndexSwiper().finally(()=>{
        setLoading(false)
    })
    // console.log(res)
    if(res.code!=200){
      setData([])
      return
    }
    setData(res.data)
  }
    //修改基本信息
    const updateInfo = ()=>{
      dispatch(setEditorSwiper(true))
    }

         //更新数据
  const reLoad = ()=>{
    getSwiperData()
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '图片',
      dataIndex: 'imgs',
      render: (text) => (
        <img src={text} style={{width:"400px",height:"200px",objectFit:"cover"}} alt="" />
      ),
    },
  ];
  return (
    <div>
      <Button onClick={updateInfo} style={{marginBottom:'20px'}} type="primary">添加或编辑轮播</Button>
      <UpdateIndexSwiperModel   reLoad={()=>reLoad()} />
      <Table loading={loading} columns={columns} rowKey="id" dataSource={data} />
    </div>
  )
}
