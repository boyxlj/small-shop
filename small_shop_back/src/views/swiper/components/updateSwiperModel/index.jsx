import React, { useEffect, useState } from 'react'
import style from "./style/index.module.scss"
import { message, Radio, Modal, Button, Input, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setEditorSwiper } from "../../store"
import { PlusOutlined } from '@ant-design/icons';
import { selectIndexSwiper, deleteIndexSwiper, addIndexSwiper } from "../../../../api/request"
import { uploadImgUrl } from '../../../../api/uploadImg';
import {authControl} from "../../../../utils/authControl"
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function UpdateIndexSwiperModel(props) {
  const dispatch = useDispatch()
  const isShowEditorSwiper = useSelector(state => state.swiperOrEditor.isShowEditorSwiper)
  const [swiperList, setSwiperList] = useState([])
  const [loading, setLoading] = useState(false)
  const { reLoad } = props
  const handleOk = () => {
    dispatch(setEditorSwiper(false))
  };
  const handleCancel = () => {
    dispatch(setEditorSwiper(false))
  };

  useEffect(() => {
    getSwiperOne()
  }, [])


  //查询当前商品的所有轮播
  const getSwiperOne = async () => {
    const { data: res } = await selectIndexSwiper()
    if (res.code != 200) {
      setSwiperList([])
      return
    }
    setSwiperList(res.data)

  }
  //删除swiper
  const removeSwiper = async (id) => {
    if(!authControl()) return 
    if (swiperList.length == 1) return message.warning("至少保留一张商品轮播")
    const { data: res } = await deleteIndexSwiper(id)
    if (res.code != 200) return message.error("删除失败")
    reLoad()
    getSwiperOne()
    message.success("删除成功")
  }
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
  const handleChange1 = (value) => {
    reLoad()
    getSwiperOne()
  }
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

  //切换是否上传图片或引入外部链接
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setFileList1([])
    setValue(e.target.value);
  }
  const [swiperLinksValue, setSwiperLinksValue] = useState("");
  const ChangeRadioLinks = (e) => {
    setSwiperLinksValue(e.target.value);
  }
  //添加; -- 引入外部链接
  const addSwiper = async () => {
    if(!authControl()) return 
    if (!swiperLinksValue) return
    const isCopy = fileList1.some(item => item.url == swiperLinksValue)
    if (isCopy) return message.warning("当前图片已存在，不可重复")
    if (swiperList?.length >= 6) return message.warning("最多只能上传6张图片")
    setLoading(true)
    const { data: res } = await addIndexSwiper(swiperLinksValue).finally(() => setLoading(false))
    if (res.code != 200) return message.error("添加失败")
    message.success("添加成功")
    setSwiperLinksValue('')
    reLoad()
    getSwiperOne()
  }
  return (
    <>
      <Modal width={700} title="编辑轮播" footer={null} okText="提交" cancelText="取消" keyboard={false} maskClosable={false} visible={isShowEditorSwiper} onOk={handleOk} onCancel={handleCancel}>
        <div className={style.boxs}>
          {swiperList?.map(item => (
            <div onClick={() => removeSwiper(item.id)} key={item.id} className={style.item}>
              <img src={item.imgs} alt="" />
            </div>
          ))}
          <br></br>
          <>
            <Radio.Group className={style.radio} style={{ margin: '5px 0 20px 0' }} onChange={onChange} value={value}>
              <Radio value={1}>引入链接</Radio>
              <Radio value={2}>上传图片</Radio>
            </Radio.Group>
            {value == 1 && (
              <div className={style.btns}>
                <Input className={style.swiperInput} onPressEnter={addSwiper} onChange={ChangeRadioLinks} value={swiperLinksValue} maxLength={400} placeholder="请填写商品轮播链接地址" />
                <Button disabled={!swiperLinksValue} className={style.swiperInputAdd} loading={loading} onClick={addSwiper} type='primary'>添加</Button>
              </div>
            )}
            {swiperList.length < 6 && value == 2 && (
              <Upload
                maxCount={1}
                action={`${uploadImgUrl}?id=123`}
                listType="picture-card"
                onPreview={handlePreview1}
                onChange={handleChange1}
                name="Miraitowa"
              >
                {fileList1.length >= 6 ? null : uploadButton1}
              </Upload>
            )}

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
        </div>
      </Modal>
    </>
  )
}
