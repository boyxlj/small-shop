import React from 'react'
import { useSearchParams } from "react-router-dom"
import style from "./style/index.module.scss"
import "./style/index.css"
import { Button, message, Modal,Radio , Tag, Result, Carousel, Upload, Steps, Form, Input, Select, InputNumber, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { categoryList, addShop, addShopSwiper } from "../../api/request"
import { uploadImgUrl } from "../../api/uploadImg"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import {getCateGoryName} from "../../utils/getCateGoryName"
import {authControl} from "../../utils/authControl"
const { Option } = Select;
const { Step } = Steps;
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });


export default function Editor() {
  const [categoryData, setCategoryData] = useState([])
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [resultModel, setResultModel] = useState(false)
  const [params] = useSearchParams()
  const detailId = params.get("detailId")
  const [form] = Form.useForm();
  const navigate = useNavigate()
  useEffect(() => {
    getCategory()
  }, [])

  //查询商品分类
  const getCategory = async () => {
    const { data: res } = await categoryList()
    if (res.code != 200) return setCategoryData([])
    setCategoryData(res.data)
  }
  const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const steps = [
    {
      title: '商品基本描述',
      content: '商品名称、原价、现价、图片、描述',
    },
    {
      title: '商品轮播',
      content: '商品的轮播展示',
    },
    {
      title: '效果预览',
      content: '效果预览展示',
    },

  ];
  const [current, setCurrent] = useState(0);


  //重置
  const onReset = () => {
    form.resetFields();
    setFileList1([])
  };


  //轮播图片上传
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
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

  //清空空白图片列表
  const resetImgEmpty = () => {
    const newList = fileList.filter(item => item.response)
    setFileList(newList)
  }
  //清空图片上传列表
  const resetImgList = () => {
    setFileList([])
  }

  const [swiper,setSwiper]=useState([])  
  const [titleImg,setTitleImg] = useState('')
  //提交商品
  const submit = async () => {
    if(!authControl()) return 
    setDisableSubmit(true)
    const formValue = form.getFieldsValue(true)
    const obj = { ...formValue, titleImg }
    let { data: res1 } = await addShop(obj).finally(() => setDisableSubmit(false))
    if (res1.code != 200) return message.error("上架商品失败")
    const detailIds = res1.detailId
    let { data: res2 } = await addShopSwiper(detailIds, swiper).finally(() => setDisableSubmit(false))
    if (res2.code != 200) return message.error("上架商品失败")
    setResultModel(true)
  }
//切换是否上传图片或引入外部链接
const [value, setValue] = useState(1);
const onChange = (e) => {
  setFileList1([])
  setLinksValue('')
  setValue(e.target.value);
}
const [linksValue, setLinksValue] = useState("");
const changeLinks = (e)=>{
  setLinksValue(e.target.value);
}
//轮播图切换是否上传图片或引入外部链接
const [swipeRadioValue, setSwipeRadioValue] = useState(1);
const onChangeRadio = (e) => {
  setFileList([])
  setSwiperLinksValue('')
  setSwipeRadioValue(e.target.value);
}
const [swiperLinksValue, setSwiperLinksValue] = useState("");
const ChangeRadioLinks = (e)=>{
  setSwiperLinksValue(e.target.value);
}

//添加; -- 引入外部链接
const addSwiper = ()=>{
  if(!swiperLinksValue) return
  const isCopy = fileList.some(item=>item.url==swiperLinksValue)
  if(isCopy) return message.warning("当前图片已存在，不可重复")
  if(fileList.length>=6) return message.warning("最多只能上传6张图片")
  const obj = {id:new Date().getTime(),url:swiperLinksValue}
  setFileList(state=>[...state,obj])
  setSwiperLinksValue('')
}

//添加; -- 引入外部链接
const removeSwiper = (id)=>{
  console.log(id)
  const result = fileList.filter(item=>item.id!=id)
  setFileList(result)

}

  //下一步
  const next = async () => {
    if (current == 0) {
      await form.validateFields()
      if (!fileList1.length && !linksValue) return message.warning("请上传一张商品图片")
      setCurrent(current + 1);
    }
    if (current == 1) {
      if (!fileList.length) return message.warning('请至少上传一张图片')
    if(swipeRadioValue==1){
      const res1 = fileList.map(item => item?.url)
      setSwiper(res1)
    }else{
      const res1 = fileList.map(item => item?.response?.temp_pathList[0])
      setSwiper(res1 )
    }
    if(value==1){
      setTitleImg(linksValue)
    }else{
      setTitleImg(fileList1.map(item => item?.response?.temp_pathList[0])[0])
    }
      setCurrent(current + 1);
    }
    if (current == 2) {
    }
  };
  //上一步
  const prev = () => {
    setCurrent(current - 1);
  };

  //上架成功后返回商品列表
  const backShopList = ()=>{
    sessionStorage.setItem("shopListPage",1)
    navigate("/shop")
  }

  
  const { title, descs, tag,parent, prePrice, price, detailDesc } = form.getFieldsValue(true)
  return (
    <div className={style.box}>
      <Steps className={style.steps} current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {steps[current].content}
        {current == 0 && (
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
              name="titleImg"
            >
                  <Radio.Group style={{margin:'5px 0 20px 0'}}  onChange={onChange} value={value}>
                    <Radio value={1}>引入链接</Radio>
                    <Radio value={2}>上传图片</Radio>
                  </Radio.Group>
                  {value==1 && (
                     <Input onChange={changeLinks} value={linksValue} maxLength={400} placeholder="请填写商品图片链接地址" />
                  )}
                  {value==2 && (
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
                  {fileList1.length >= 6 ? null : uploadButton1}
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
        )}
        {current == 1 && (
           <>
           <Radio.Group  className={style.radioSwiper} onChange={onChangeRadio} value={swipeRadioValue}>
           <Radio value={1}>引入链接</Radio>
           <Radio value={2}>上传图片</Radio>
         </Radio.Group>
         {swipeRadioValue==1 && (
          <>
          <div className={style.boxs}>
            {fileList?.map(item=>(
            <div onClick={()=>removeSwiper(item.id)} key={item.id} className={style.item}>
              <img src={item.url} alt="" />
            </div>
            ))}
          </div>
          <div  className={style.btns}>
            <Input className={style.swiperInput} onPressEnter={addSwiper} onChange={ChangeRadioLinks} value={swiperLinksValue} maxLength={400} placeholder="请填写商品轮播链接地址" />
            <Button  className={style.swiperInputAdd} onClick={addSwiper} type='primary'>添加</Button>

          </div>
          </>
          )}
       {swipeRadioValue==2 && (
           <>
           <Upload
             multiple={true}
             maxCount={6}
             action={uploadImgUrl}
             listType="picture-card"
             fileList={fileList}
             onPreview={handlePreview}
             onChange={handleChange}
             name="Miraitowa"
           >
             {fileList.length >= 8 ? null : uploadButton}
           </Upload>
           <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
             <img
               alt="example"
               style={{
                 width: '100%',
               }}
               src={previewImage}
             />
           </Modal>
         </>
       )}
          </>
        )}
        {current == 2 && (
          <div className={style.results}>
            <div className={style.results_top}>
              <li><span>商品图片:</span>
                <img src={titleImg} alt="" />
              </li>
              <li><span>商品名称:</span>{title}</li>
              <li><span>基本描述:</span>{title}</li>
              {tag &&<li><span>商品标签:</span><Tag color="#87d068">{tag}</Tag></li>}
              <li><span>所属分类:</span><Tag color="#f50">{getCateGoryName(categoryData,parent)}</Tag></li>
              {prePrice&& <li><span>商品原价:</span> <Tag color="cyan">{prePrice}元</Tag></li>}
              <li><span>商品现价:</span> <Tag color="red">{price}元</Tag></li>
              <li><span>详细描述:</span><p>{detailDesc}</p></li>
            </div>
            <div className={style.results_bottom}>
              <Carousel autoplay className={style.swiper} >
                {swiper?.map((item, index) => (
                  <div key={index} >
                    <img src={item} alt="" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
      <div className="steps-action">

        {current == 0 && (
          <Popconfirm
            title="此操作会清空当前所有输入内容切不可撤销"
            onConfirm={onReset}
            okText="我知道"
            cancelText="算了吧"
          >
            <Button style={{ marginRight: "20px" }}  >
              重置
            </Button>
          </Popconfirm>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}

        {current == 1 && swipeRadioValue==2 && (
          <>
            <Button onClick={resetImgEmpty} style={{ marginLeft: "20px" }}  >
              清空空白图片
            </Button>
            <Popconfirm
              title="此操作会清空当前所有图片列表"
              onConfirm={resetImgList}
              okText="我知道"
              cancelText="算了吧"
            >
              <Button style={{ marginLeft: "20px" }}  >
                重置
              </Button>
            </Popconfirm>
          </>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" loading={disableSubmit} onClick={submit}>
            上架商品
          </Button>
        )}

      </div>
      <Modal visible={resultModel} keyboard={false} maskClosable={false} closable={false} footer={null} >
        <Result
          status="success"
          title="商品上架成功"
          extra={[
            <Button onClick={backShopList} type="primary" key="console">
              回到商品列表
            </Button>,
          ]}
        />
      </Modal>
    </div>
  )
}
