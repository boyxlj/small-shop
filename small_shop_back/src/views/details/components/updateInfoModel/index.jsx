import React, { useState, useEffect } from 'react'
import style from "./style/index.module.scss"
import { Modal, message, Form, Upload,Radio, Input, Select, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setEditorInfo } from "../../store"
import { PlusOutlined } from '@ant-design/icons';
import { categoryList, updateShopBaseInfo } from "../../../../api/request"
import { uploadImgUrl } from '../../../../api/uploadImg';
import { useNavigate } from 'react-router-dom';
import {authControl} from "../../../../utils/authControl"

const { Option } = Select;
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UpdateInfoModel(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isShowEditorInfo = useSelector(state => state.detailOrEditor.isShowEditorInfo)
  const [categoryData, setCategoryData] = useState([])
  const [form] = Form.useForm();
  //商品图片上传
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState('');
  const [previewTitle1, setPreviewTitle1] = useState('');
  const [fileList1, setFileList1] = useState([]);
  const handleCancel1 = () => setPreviewVisible1(false);
  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange1 = ({ fileList: newFileList }) => setFileList1(newFileList);
  const uploadButton1 = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传
      </div>
    </div>
  );
  const { detailId, reLoad, data } = props
  useEffect(() => {
    getCategory()
    getShopData()
  }, [data])
  //获取商品信息

  const getShopData = async () => {
    const imgs = [{ uid: 123, data: data[0]?.titleImg }]
    setFileList1(imgs)
    form.setFieldsValue({
      title: data[0]?.title,
      descs: data[0]?.descs,
      parent: data[0]?.parent,
      prePrice: data[0]?.prePrice,
      price: data[0]?.price,
      detailDesc: data[0]?.detailDesc,
      tag: data[0]?.tag,
    })
  }

  //查询商品分类
  const getCategory = async () => {
    const { data: res } = await categoryList()
    if (res.code != 200) return setCategoryData([])
    setCategoryData(res.data)
  }

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const handleOk = async () => {
    if(!authControl()) return 
    await form.validateFields()
    if (!fileList1.length && !swiperLinksValue) return message.warning("请上传一张商品图片")
    let titleImg= null
    if(value==1){
      titleImg =swiperLinksValue 
    }else{
      const pre = fileList1[0]?.data
    const news =  fileList1[0]?.response?.temp_pathList[0]
     news?titleImg= news:titleImg = pre
    }
    const obj = {...form.getFieldsValue(true),titleImg,detailId}
    const {data:res} = await updateShopBaseInfo(obj)
    if(res.code!=200) return message.error("编辑商品信息失败")
    message.success("编辑商品信息成功")
    setSwiperLinksValue("")
    reLoad()
    dispatch(setEditorInfo(false))
  };
  const handleCancel = () => {
    form.resetFields()
    setSwiperLinksValue("")
    dispatch(setEditorInfo(false))
  };

  //图片上传
    //切换是否上传图片或引入外部链接
    const [value, setValue] = useState(2);
    const onChange = (e) => {
      setValue(e.target.value);
    }
    const [swiperLinksValue, setSwiperLinksValue] = useState("");
    const ChangeRadioLinks = (e)=>{
      setSwiperLinksValue(e.target.value);
    }
  return (
    <>
      <Modal width={600} title="编辑商品基本信息" okText="提交" cancelText="取消" keyboard={false} maskClosable={false} visible={isShowEditorInfo} onOk={handleOk} onCancel={handleCancel}>
        <Form className={style.form} {...layout} form={form} name="control-hooks">
          <Form.Item
            className={style.form_item}
            name="title"
            label="商品名称"
            rules={[{ required: true, message: '商品名称必须填写' }]}
          >
            <Input maxLength={35} placeholder="请填写商品名称" />
          </Form.Item>

          <Form.Item
            className={style.form_item}
            name="descs"
            label="基本描述"
            rules={[{ required: true, message: '商品基本描述必须填写' }]}
          >
            <Input maxLength={45} placeholder="请填写商品基本描述" />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            name="parent"
            label="所属分类"
            rules={[{ required: true, message: '商品所属分类必须填写' }]}
          >
            <Select
              placeholder="请选择商品分类"
              allowClear
            >
              {categoryData?.map(item => (
                <Option key={item.detailId} value={item.detailId + ''}>{item.categoryName}</Option>
              ))}

            </Select>
          </Form.Item>
          <Form.Item
            className={style.form_item}
            name="tag"
            label="商品标签"
          >
            <Input maxLength={6} placeholder="请填写商品标签" />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            name="prePrice"
            label="商品原价"
          >
            <InputNumber style={{ width: "100%" }} min={1} max={100000} placeholder="请填写商品原价" />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            name="price"
            label="商品现价"
            rules={[{ required: true, message: '商品现价必须填写' }]}
          >
            <InputNumber style={{ width: "100%" }} min={1} max={100000} placeholder="请填写商品现价" />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            name="detailDesc"
            label="详细描述"
            rules={[{ required: true, message: '商品详细描述必须填写' }]}
          >
            <TextArea rows={4} showCount maxLength={300} placeholder="请填写商品详细描述" />
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="商品图片"
          >
            <Radio.Group className={style.radio} style={{margin:'5px 0 20px 0'}}   onChange={onChange} value={value}>
                    <Radio value={2}>上传图片</Radio>
                    <Radio value={1}>引入链接</Radio>
                  </Radio.Group>
             {value==1 &&(
                 <div  className={style.btns}>
                 <Input className={style.swiperInput} onChange={ChangeRadioLinks} value={swiperLinksValue} maxLength={400} placeholder="请填写商品轮播链接地址" />
                 {/* <Button  className={style.swiperInputAdd} onClick={addSwiper} type='primary'>添加</Button> */}
               </div>
             )} 
             {value==2 &&(
              <>
              <Upload
                maxCount={1}
                action={uploadImgUrl}
                listType="picture-card"
                fileList={fileList1}
                onPreview={handlePreview1}
                onChange={handleChange1}
                name="Miraitowa"
              >
                {fileList1.length >= 8 ? null : uploadButton1}
              </Upload>
              <Modal visible={previewVisible1} title={previewTitle1} footer={null} onCancel={handleCancel1}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage1}
                />
              </Modal>
            </>
             )}
            
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}