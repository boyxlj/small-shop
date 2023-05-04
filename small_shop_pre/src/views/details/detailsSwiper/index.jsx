import { Carousel } from 'antd';
import React from 'react';
import style from "./style/index.module.scss" 

export default function DetailsSwiper(props){
  const {detailSwiper}  = props
  return(
  <Carousel className={style.detailSwiper} arrow="hover" speed={800} autoplay>
    {detailSwiper?.map(item=>(
    <div key={item.id}>
      <img src={item.imgs} alt="" />
    </div>
    ))}
  </Carousel>
  )
}

