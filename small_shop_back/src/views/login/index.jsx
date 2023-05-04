import React, { useEffect } from 'react'
import style from "./style/index.module.scss"
import { Button, Form, Input,message } from 'antd';
import {useNavigate} from "react-router-dom"
import {setLogin} from "../../api/request"
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 16,
  },
};

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    if(token) return navigate("/")
  },[])


  const onFinish = async(values) => {
    const {data:res} = await setLogin(values)
    if(res.code==400) return message.error("该账号未进行注册")
    if(res.code==404) return message.error("密码错误")
    sessionStorage.setItem("token",res.token)
    sessionStorage.setItem("secretKey",res.secret)
    message.success("登录成功")
    navigate("/small-shop/statistics")
    window.location.reload()
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={style.box}>
      <div className={style.content}>
        <h1>微商城后台管理</h1>
        <Form className={style.form} {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="username"
        className={style.item}
        label="账号"
        rules={[
          {
            required: true,
            message:"管理员账号不能为空"
          },
        ]}
      >
        <Input placeholder='请输入管理员账号' />
      </Form.Item>
      <Form.Item
      className={style.item}
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message:"密码不能为空"
          },
        ]}
      >
        <Input.Password placeholder='请输入密码' />
      </Form.Item>
    
       
      <Form.Item className={style.item} {...tailLayout}>
        <Button  className={style.btn} type="dashed" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
      </div>
    <div className={style.footer}>Copyright © 2021-{new Date().getFullYear()} small-shop 微商城 All Rights Reserved</div>
    </div>
  )
}
