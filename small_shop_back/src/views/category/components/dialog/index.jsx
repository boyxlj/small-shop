import React from 'react'
import style from "./style/index.module.scss"
import { Button, Modal,Input,message } from 'antd';
import { useDispatch,useSelector } from 'react-redux/es/exports';
import {changeIsShow} from "../../store"
import { useState } from 'react';
import {addCategory,updateCategory} from "../../../../api/request"
import {authControl} from "../../../../utils/authControl"
export default function CateGoryDialog(props) {
  const dispatch  = useDispatch()
  const isShow = useSelector(state=>state.category.isShow)
  const detailId = useSelector(state=>state.category.detailId)
  const [inputValue,setInputValue] = useState("")
  const {reLoad} = props
  const handleOk = async() => {
    if(!authControl()) return 
    if(!inputValue) return message.warning("分类名称不能为空")
    if(detailId){
      const {data:res} = await updateCategory(detailId,inputValue)
      if(res.code!=200) return message.error("修改失败")
      message.success("修改成功")
    }else{
      const {data:res} = await addCategory(inputValue)
      if(res.code!=200) return message.error("添加失败")
      message.success("添加成功")
    }
    reLoad()
    setInputValue("")
    dispatch(changeIsShow({isShow:false}))
  };

  const handleCancel = () => {
    setInputValue("")
    dispatch(changeIsShow({isShow:false}))
  };

  //输入框发生变化
  const changeInput = (e)=>{
    setInputValue(e.target.value)
  }
  return (
    <>
    <Modal  okText="提交" cancelText="取消" title={detailId?"编辑分类":"添加分类"} visible={isShow} onOk={handleOk} onCancel={handleCancel}>
    分类名称：<Input maxLength={7} onChange={changeInput} value={inputValue} style={{marginTop:'15px'}} placeholder="请填写分类名称" />
    </Modal>
  </>
  )
}
