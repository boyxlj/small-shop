import React from 'react';
import style from "./style/index.module.scss"
import { useNavigate } from "react-router-dom"
import "../../assets/css/iconfont/iconfont.css"
export default function IndexShop(props) {
  const { itemShopList, hiddenTile } = props
  const navigate = useNavigate()

  //商品详情
  const clickDetail = (value) => {
    navigate(`/details?detailId=${value}`)
  }

  return (
    <div className={style.box}>
      {!hiddenTile && <p className={style.topTitle}><span>手机</span><span>查看更多</span><i className='iconfont icon-xiayiyeqianjinchakangengduo-xianxingyuankuang
'></i></p>}
      <div className={style.itemBox}>
        <ul style={{ paddingTop: hiddenTile ? "20px" : "" }}>
          {itemShopList.map(item => (
            <li onClick={() => clickDetail(item.detailId)} key={item.detailId}>
              <div className={style.imgs}>
                <img src={item.titleImg} alt="" />
              </div>
              <div className={style.title}>
                {item.tag && <span >{item.tag}</span>}
                {item.title}</div>
              <div className={style.desc}>{item.descs}</div>
              <div className={style.price}>
                <span className={style.prePrice}>{item.price}元</span>
                {item.prePrice && <span className={style.nowPrice}>{item.prePrice}元</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}