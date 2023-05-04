import React, { useEffect, useState } from 'react'
import style from "./style/index.module.scss"
import { CheckOutlined } from '@ant-design/icons';
import DetailsSwiper from "./detailsSwiper"
import { message, Spin } from 'antd';
import { getDetailSwiper, getShopdetails, userIscollect, addCollect, deleteCollectnews, addCar } from "../../api/request"
import { useSearchParams } from "react-router-dom"
import { changeLoginDialogShow } from "../../store/reducer/login"
import { setSuccessTip } from '../../store/reducer/global';
import { useDispatch, useSelector } from "react-redux"
import UpdateTitle from '../../components/updateTitle'
import { setCarTotal } from '../../store/reducer/global';
export default function Details() {
  const sureLogin = useSelector(state => state.loginDialog.sureLogin)
  const userId = useSelector(state => state.userInfo.userId)
  const dispatch = useDispatch()

  const [params] = useSearchParams()
  const detailId = params.get("detailId")
  const [detailSwiper, setDetailSwiper] = useState([])
  const [shopDetail, setShopDetail] = useState([])
  const [isCollect, setIsCollect] = useState(true)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.documentElement.scrollTop = 120
    getSwiper(detailId)
    getDetails(detailId)
    PuserIsCollect()
  }, [])

  //获取详情页轮播
  const getSwiper = async (detailId) => {
    const { data: res } = await getDetailSwiper(detailId)
    setDetailSwiper(res.data)
  }
  //查询指定商品信息
  const getDetails = async (detailId) => {
    setLoading(true)
    const { data: res } = await getShopdetails(detailId).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 400);
    })
    setShopDetail(() => res.data)
  }
  //判断用户是否收藏当前商品
  const PuserIsCollect = async () => {
    if (!sureLogin) return setIsCollect(false)
    const { data: res } = await userIscollect(userId, detailId)
    if (res.code != 200) return setIsCollect(false)
    setIsCollect(true)
  }
  //添加收藏
  const PaddCollect = async () => {
    const { data: res } = await addCollect(userId, detailId)
    if (res.code != 200) return message.error("收藏失败")
    PuserIsCollect()
    message.success("已添加至我的收藏")
  }
  // 取消收藏
  const PcancelCollect = async () => {
    const { data: res } = await deleteCollectnews(userId, detailId)
    if (res.code != 200) return message.error("移除收藏失败")
    PuserIsCollect()
    message.success("已从我的收藏中移除")
  }

  const clickCar = async (value) => {
    if (!sureLogin) return dispatch(changeLoginDialogShow())
    const { data: res } = await addCar(userId, value)
    if (res.code == 403) return message.warning("该商品已在您的购物车里喽")
    if (res.code == 404) return message.error("添加购物车失败")
    dispatch(setSuccessTip({
      successDialogTip: true,
      TipText: "已成功加入购物车！",
      isShowCar: true
    }))
    dispatch(setCarTotal(userId))
  }
  const clickCollect = (value) => {
    if (!sureLogin) return dispatch(changeLoginDialogShow())
    if (isCollect) {
      //取消收藏
      PcancelCollect()
    } else {
      //添加收藏
      PaddCollect()
    }
  }

  if (shopDetail.length) {
    var { descs, detailDesc, prePrice, price, tag, title, titleImg } = shopDetail[0]
  }

  return (
    <div className={style.box}>
      <UpdateTitle title="商品详情" />
      {loading && (
        <div className={style.loading} style={{ padding: loading ? '340px 0' : '0' }}>
          <Spin />
        </div>
      )}
      {!loading && (
        <div className={style.details}>
          <div className={style.top}>
            <li className={style.topLeft}>{title}{tag && <span>{tag}</span>}</li>
            <li className={style.topRight}>
              <a href='javascript:;'>商品详情</a>
              <a href='javascript:;'>规格参数 </a>
              <a href='javascript:;'>包装与售后</a>
              <a href='javascript:;'>用户评价</a>
            </li>
          </div>
          <div className={style.center}>
            <div className={style.centerLeft}>
              <DetailsSwiper detailSwiper={detailSwiper} />
            </div>
            <div className={style.centerRight}>
              <p className={style.title}>{title}{tag && <span>{tag}</span>}</p>
              <p className={style.descs}>{descs ? descs : ""} / {detailDesc}</p>
              <p className={style.mi}>微商城自营</p>
              <p className={style.price}>
                <span className={style.prePrice}>{price}元</span>
                {prePrice && <span className={style.nowPrice}>{prePrice}元</span>}
              </p>
              <p className={style.line}></p>
              <div className={style.total}>
                <div className={style.totalTop}>
                  <p className={style.totalTopTitle}>
                    {title}

                  </p>
                  <p className={style.totalTopPrice}>
                    <span className={style.prePrice}>{price}元</span>
                    {prePrice && <span className={style.nowPrice}>{prePrice}元</span>}
                  </p>
                </div>
                <div className={style.totalPriceBottom}>总计 ：{price}元</div>
              </div>
              <div className={style.btns} >
                <div className={style.car} onClick={() => clickCar(detailId)}>加入购物车</div>
                <div className={`${style.like} ${!isCollect ? '' : style.collectActive}`} onClick={() => clickCollect(detailId)} >{isCollect ? "已收藏" : "收藏"}</div>
              </div>
              <div className={style.footer}>
                <span><CheckOutlined className={style.icon} />微商城自营</span>
                <span><CheckOutlined className={style.icon} />微商城发货</span>
                <span><CheckOutlined className={style.icon} />7天无理由退货</span>
                <span><CheckOutlined className={style.icon} />7天价格保护</span>
              </div>
            </div>
          </div >
        </div>
      )}

    </div>
  )
}
