import { Carousel } from 'antd';
import React from 'react';
import { useState } from 'react';
import style from "./style/index.module.scss"
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import { setPageOn } from '../../views/goods/store/pageNation';
export default function Swiper(props) {
  const { swiperList, category } = props
  const dispatch = useDispatch()
  const [isShowShopList, setIsShowShopList] = useState(false)
  const [index, setIndex] = useState(0)
  const [content, setContent] = useState([])
  const navigate = useNavigate()
  //跳转商品分类
  const navigateCategory = (detailId) => {
    navigate(`/goods?category=${detailId}`)
  }

  //鼠标进入商品分类
  const enterCategory = (detailId) => {
    setIsShowShopList(true)
    setIndex(detailId)
    if (category) {
      const res = category?.filter(item => item.detailId == detailId)
      setContent(res[0]?.children)
    }
  }
  //鼠标移出商品分类
  const leaveCategory = () => {
    setIsShowShopList(false)
    setIndex(0)
  }
  //跳转商品详情
  const navigateDetail = (detailId) => {
    dispatch(setPageOn(1))
    navigate(`/details?detailId=${detailId}`)
  }
  //查看全部
  const clickSelectAll = () => {
    dispatch(setPageOn(1))
    if (content[0]?.parent) {
      navigate(`/goods?category=${content[0]?.parent}`)
    }
  }
  return ( 
    <div className={style.swiper}>
      <Carousel className={style.swiperBoss} autoplay effect="fade">
        {swiperList?.map(item => (
          <div className={style.swiperBox} key={item.id}>
            <img src={item.imgs} alt="" />
          </div>
        ))}
      </Carousel>
      {
        category?.slice(0, 8)?.length > 0 && (
          <div className={style.list} onMouseLeave={leaveCategory} >
            <div className={style.left}>
              {
                category?.slice(0, 8).map(item => (
                  <li
                    onMouseEnter={() => enterCategory(item.detailId)}
                    onClick={() => navigateCategory(item.detailId)}
                    key={item.detailId} className={`${style.item} ${index == item.detailId ? style.active : ''}`} >
                    <span>{item.categoryName}</span>
                    <span className={style.charts}>&gt;</span>
                  </li>
                )
                )
              }
            </div>
            {
              isShowShopList && (
                <div className={style.right}>
                  {content?.slice(0, 11)?.map(item => (
                    <li onClick={() => navigateDetail(item.detailId)} key={item.detailId} className={style.contentItem}>
                      <img src={item.titleImg} alt="" />
                      <span>{item.title}</span>
                      {item.tag&&<div>{item.tag}</div>}
                    </li>
                  ))}
                  {
                    content == undefined && (
                      <div className={style.empty}>
                        <ConfigProvider locale={zhCN}>
                          <Empty />
                        </ConfigProvider>
                      </div>
                    )
                  }
                  {
                    content?.length > 0 && (<div className={style.selectAll}>
                      <div className={style.textTitles} onClick={clickSelectAll}>
                      <button className={style['learn-more']}>
                          <span className={style.circle} aria-hidden="true">
                          <span className={`${style.icon} ${style.arrow}`}></span>
                          </span>
                          <span className={style['button-text']}>查看全部</span>
                        </button>
                      </div>
                    </div>)
                  }
                </div>
              )
            }
          </div>
        )
      }

    </div>
  )
}