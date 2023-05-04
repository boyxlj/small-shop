import React, { useEffect } from 'react'
import style from "./style/index.module.scss"
import { Button, Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { changeIsShow } from "../../store"
import { useState } from 'react';
import {authControl} from "../../../../utils/authControl"
import { addUser, updateUser, selectUserOne } from "../../../../api/request"
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function UserDialog(props) {
  const dispatch = useDispatch()
  const isShow = useSelector(state => state.user.isShow)
  const userId = useSelector(state => state.user.userId)
  const [disable, setDisable] = useState(false)
  const [form] = Form.useForm();
  const { reLoad } = props
  useEffect(() => {
    if (userId){
      setDisable(true)
      getUserOne()
    } else{
      setDisable(false)
    }
  }, [userId])

  //获取指定用户信息
  const getUserOne = async () => {
    const { data: res } = await selectUserOne(userId)
    if (res.code != 200) {
      message.error("数据异常")
      dispatch(changeIsShow({ isShow: false }))
      return
    }
    form.setFieldsValue({
      name:res.data[0]?.name,
      username:res.data[0]?.username,
      password:res.data[0]?.password,
      userId:res.data[0]?.userId,
    })
  }
  const handleOk = async () => {
    if(!authControl()) return false
    await form.validateFields()
    if (userId) {
      const obj = { ...form.getFieldsValue(true), userId }
      const {data:res} = await updateUser(obj)
      if(res.code!=200) return message.error("修改失败")
      message.success("修改成功")
    } else {
      const obj = { ...form.getFieldsValue(true) }
      const {data:res} = await addUser(obj)
      if(res.code!=200) return message.error("添加失败")
      message.success("添加成功")
    }
    reLoad()
    form.resetFields()
    dispatch(changeIsShow({ isShow: false }))
  };

  const handleCancel = () => {
    form.resetFields()
    dispatch(changeIsShow({ isShow: false }))
  };




  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Modal okText="提交" cancelText="取消" title={userId ? "编辑用户信息" : "添加用户"} visible={isShow} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout} form={form} name="control-hooks" >
         {userId && (
           <Form.Item
           name="userId"
           label="用户ID"
         >
           <Input disabled maxLength={10} placeholder='请填写用户账号' />
         </Form.Item>
         )}
          <Form.Item
            name="name"
            label="用户昵称"
            rules={[
              {
                required: true, message: "用户昵称不能为空"
              },
            ]}
          >
            <Input maxLength={8} placeholder='请填写用户账号' />
          </Form.Item>
          <Form.Item
            name="username"
            label="用户账号"
            rules={[
              {
                required: true, message: "用户账号不能为空"
              },
            ]
            }
          >
            <Input disabled={disable} maxLength={12} placeholder='请填写用户账号' />
          </Form.Item>
          <Form.Item
            name="password"
            label="用户密码"
            rules={[
              {
                required: true, message: "用户密码不能为空"
              },
            ]}
          >
            <Input maxLength={12} placeholder='请填写用户密码' />
          </Form.Item>
        
        </Form>
      </Modal>
    </>
  )
}
