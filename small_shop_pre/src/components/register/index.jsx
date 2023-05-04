import { Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeRegisterDialogShow } from '../../store/reducer/login'
import { Button, Form, Input, message } from 'antd';
import { userRegister } from "../../api/request"
export default function Register(){
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const isShowRegister = useSelector(state => state.loginDialog.isShowRegister)
  const dispatch = useDispatch()

  const handleOk = () => {
    dispatch(changeRegisterDialogShow());
  };
  const onCancel = () => {
    form.resetFields();
    dispatch(changeRegisterDialogShow());
  };
  const onFinish = async (values) => {
    setLoading(true)
    const { data: res } = await userRegister(values).finally(()=>setLoading(false))
    if (res.code == 403) return message.warning('账号已存在');
    if (res.code == 404) return message.error('注册失败');
    message.success('注册成功');
    dispatch(changeRegisterDialogShow());
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
  };

  return (
    <>

      <Modal title={
        <h3 style={{ textAlign: "center", borderBottom: "none" }}>注册</h3>
      } footer={null} visible={isShowRegister}
        maskClosable={false}
        keyboard={false}
        centered={true}
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
            label="昵称"
            name="name"
            style={{ paddingBottom: "10px" }}
            rules={[
              {
                required: true,
                message: '请输入您的昵称',
              },
            ]}
          >
            <Input placeholder="请输入您的昵称" />
          </Form.Item>
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
            <Input placeholder="请输入您的账号" />
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
            <Input.Password placeholder="请输入您的密码" />
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" loading={isLoading} block htmlType="submit">
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

