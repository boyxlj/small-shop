import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import style from "./style/index.module.scss"
import { Tag, Carousel, Button } from "antd"
import { selectShopAnyOne, categoryList } from "../../api/request"
import { getDate } from "../../utils/time"
import { useDispatch } from 'react-redux'
import { setEditorInfo, setEditorSwiper } from "./store"
import UpdateInfoModel from './components/updateInfoModel'
import UpdateSwiperModel from './components/updateSwiperModel'
import { getCateGoryName } from "../../utils/getCateGoryName"
export default function Details() {
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const detailId = params.get("detailId")
  const [swiperList, setSwiperList] = useState([])
  const [data, setData] = useState([])
  const [category, setCategory] = useState([])

  useEffect(() => {
    getShopData()
    getCateGory()
  }, [])
  //获取商品信息
  const getShopData = async () => {
    const { data: res } = await selectShopAnyOne(detailId)
    if (res.code != 200) {
      setSwiperList([])
      setData([])
      return
    }
    setData(res.data)
    setSwiperList(res.swiper)
  }

  const getCateGory = async () => {
    const { data: res } = await categoryList(detailId)
    if (res.code != 200) {
      setCategory([])
      return
    }
    setCategory(res.data)
  }

  //修改轮播
  const updateSwiper = () => {
    dispatch(setEditorSwiper(true))
  }
  //修改基本信息
  const updateInfo = () => {
    getShopData()
    dispatch(setEditorInfo(true))
  }
  //更新数据
  const reLoad = () => {
    getShopData()
  }

  return (
    <div className={style.results}>
      <Button onClick={updateInfo} className={style.update_info} type="primary">编辑商品信息</Button>
      {data?.map(item => (
        <div key={item.detailId} className={style.results_top}>
          <li><span>商品图片:</span>
            <img src={item.titleImg} alt="" />
          </li>
          <li><span>商品名称:</span>{item.title}</li>
          <li><span>基本描述:</span>{item.descs}</li>
          {item.tag && <li><span>商品标签:</span> <Tag color="#87d068">{item.tag}</Tag></li>}
          <li><span>所属分类:</span><Tag color="#f50">{getCateGoryName(category, item.parent)}</Tag></li>
          {item.prePrice && <li><span>商品原价:</span> <Tag color="cyan">{item.prePrice}元</Tag></li>}
          <li><span>商品现价:</span> <Tag color="red">{item.price}元</Tag></li>
          <li><span>上架时间:</span>{getDate(item.createTime)}</li>
          <li><span>详细描述:</span><p>{item.detailDesc}</p></li>
        </div>
      ))}
      <Button onClick={updateSwiper} className={style.update_swiper} type="primary">编辑商品轮播</Button>
      {swiperList.length ? (
        <div className={style.results_bottom}>
          <Carousel autoplay className={style.swiper} >
            {swiperList?.map(item => (
              <div key={item.id}>
                <img src={item.imgs} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <h1 className={style.noSwiper}>该商品未添加轮播内容</h1>
      )}
      <UpdateInfoModel data={data} detailId={detailId} reLoad={() => reLoad()} />
      <UpdateSwiperModel detailId={detailId} reLoad={() => reLoad()} />
    </div>
  )
}