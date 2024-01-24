import React from 'react'
import UpdateTitle from '../../components/updateTitle'
import style from "./style/index.module.scss"
import { Button, message, Form, Input,Spin } from 'antd';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {updateUserInfo} from "../../api/request"
import {setUserInfo} from "../../store/reducer/user"
import { useEffect } from 'react';
export default function Profile() {
  const [form] = Form.useForm();

  const dispatch = useDispatch()
  const userId = useSelector(state=>state.userInfo.userId)
  const name = useSelector(state=>state.userInfo.name)
  const [submitLoading,setSubmitLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setLoading(true)
    form.setFieldsValue({
      name,
    })
    setTimeout(() => {
      setLoading(false)
    }, 400);
  },[])
  const onFinish =async (values) => {
    setSubmitLoading(true)
    const {data:res} = await updateUserInfo({name:values.name,userId}).finally(()=>setSubmitLoading(false))
    if(res.code!=200) return message.error("信息修改失败")
    message.success("提交成功")
    dispatch(setUserInfo(res.data[0]))
  };

  const onFinishFailed = (errorInfo) => {
  };
  return (
    <div>
       <UpdateTitle title="个人中心"/>
       <div className={style.profile}></div>
      <h2>个人中心</h2>
      {loading &&(
      <div className={style.loading} style={{padding:loading?'140px 0':'0'}}>
       <Spin size='large' />
    </div>
    )}
    {!loading&&(
  <Form
  form={form}
  className={style.forms}
  name="basic"
  labelCol={{
    span: 3,
  }}
  wrapperCol={{
    span: 16,
  }}
  initialValues={{
    remember: true,
  }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
>
  <Form.Item
    label="用户昵称"
    name="name"
    rules={[
      {
        required: true,
        message: '请填写您的昵称!',
      },
    ]}
  >
    <Input maxLength={8} minLength={2} placeholder='请填写您的昵称' />
  </Form.Item>

  <Form.Item
    wrapperCol={{
      offset: 3,
      span: 16,
    }}
  >
    <Button type="primary" loading={submitLoading} htmlType="submit">
      提交
    </Button>
  </Form.Item>
</Form>
    )}
    
      </div>
  )
}
