import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { changeLoginDialogShow, isSureLogin } from '../../store/reducer/login'
import { setUserInfo } from '../../store/reducer/user'
import {setCarTotal} from "../../store/reducer/global"
import { userLogin } from "../../api/request"
import {useNavigate} from "react-router-dom"
export default function Login(){
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const isShowLogin = useSelector(state => state.loginDialog.isShowLogin)
  const fullPath = useSelector(state => state.loginDialog.fullPath)
  const dispatch = useDispatch()
  const router = useNavigate()

  const handleOk = () => {
    dispatch(changeLoginDialogShow());
  };
  const onCancel = () => {
    form.resetFields();
    dispatch(changeLoginDialogShow());
  };

  const onFinish = async (values) => {
    setLoading(true)
    const { data: res } = await userLogin(values).finally(()=> setLoading(false))
    if (res.code == 403) return message.warning('账号不存在');
    if (res.code == 404) return message.error('账号或密码错误');
    message.success('登录成功');
    if(fullPath){
      router(fullPath)
    } 
    await dispatch(setUserInfo(res.data[0]))
    await dispatch(changeLoginDialogShow());
    await dispatch(setCarTotal(res.data[0].userId))
    form.resetFields();
    dispatch(isSureLogin());
    localStorage.setItem("token", res.token)
  };
  const onFinishFailed = (errorInfo) => {
  };

  return (
    <>
      <Modal  title={
        <h3 style={{ textAlign: "center", borderBottom: "none" }}>欢迎登录微商城</h3>
      } footer={null} visible={isShowLogin}
        maskClosable={false}
        width={460}
        centered={true}
        keyboard={false}
        onCancel={onCancel}
        onOk={handleOk} >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 5,
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
            label="账号"
            name="username"
            style={{ paddingBottom: "10px" }}
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input placeholder='请输入账号' />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            style={{ paddingBottom: "10px" }}
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password placeholder='请输入密码' />
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" loading={isLoading} block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
