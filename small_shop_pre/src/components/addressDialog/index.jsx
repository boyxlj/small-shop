import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { setAddressDialog,addAddresss,updateAddresss,setSubmitBtn } from '../../store/reducer/address';
import style from "./style/index.module.scss"
import { Button, Modal, Checkbox, Form, Input, message } from 'antd';
import { selectAddressOne } from "../../api/request"
const { TextArea } = Input;
export default function AddressDialog() {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const addressDialog = useSelector(state => state.address.addressDialog)
  const isEditor = useSelector(state => state.address.isEditor)
  const submitBtnDisable = useSelector(state => state.address.submitBtnDisable)
  const handleCancel = () => {
    form.resetFields()
    dispatch(setAddressDialog(false))
  };

  const onFinish = (values) => {
    const type = values.type?"1":"0"
    const obj = {...values,type}
    dispatch(setSubmitBtn(true))
    if (isEditor) {
      dispatch(updateAddresss({addressId:isEditor,...obj}))
      getAddressOne()
    } else {
      dispatch(addAddresss(obj))
      getAddressOne()
    }
    form.setFieldsValue()
  };

  
  useEffect(() => {
    if (isEditor) {
      dispatch(setSubmitBtn(true))
      getAddressOne(isEditor)
    } else {
      form.resetFields()
      dispatch(setSubmitBtn(false))
    }
  }, [isEditor,addressDialog])

  //查询指定地址信息
  const getAddressOne = async (addressId) => {
    const { data: res } = await selectAddressOne(addressId)
    if (res.code != 200) return 
    dispatch(setSubmitBtn(false))
    form.setFieldsValue({
      name:res.data[0].name,
      phone:res.data[0].phone,
      detailAddress:res.data[0].detailAddress,
      type:res.data[0].type,
      
    })
  }
  const onFinishFailed = (errorInfo) => {
  };
  const reset = (errorInfo) => {
  };
  return (
    <Modal title={!isEditor ? "添加收货地址" : "编辑收货地址"} style={{ textAlign: "center" }} keyboard={false} maskClosable={false} footer={null} visible={addressDialog} onCancel={handleCancel}>
      <Form
        form={form}
        className={style.form}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
      
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="收货人"
          name="name"
          rules={[
            {
              required: true,
              message: '收货人不能为空!',
            },
          ]}
        >
          <Input  maxLength={10} placeholder='请填写收货人昵称' />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          rules={[
            {
              required: true,
              message: '联系电话不能为空!',
            },
          ]}
        >
          <Input  maxLength={11} placeholder='请填写联系电话' />
        </Form.Item>
        <Form.Item
          label="详细地址"
          name="detailAddress"
          rules={[
            {
              required: true,
              message: '详细地址不能为空!',
            },
          ]}
        >
          <TextArea showCount maxLength={50} rows={3} placeholder='请填写详细地址' />
        </Form.Item>
        <Form.Item name="type" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
          <Checkbox>设为默认地址</Checkbox>
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" onClick={() => form.resetFields()}>
            重置
          </Button>
          <Button disabled={submitBtnDisable} type="primary" className={style.submit} htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
