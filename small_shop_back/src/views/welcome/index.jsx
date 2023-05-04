import React from 'react'
import style from "./style/index.module.scss"
import { useEffect } from 'react';
import {getCategoryPieData} from "./common/getCategoryPieData"
import {getOrderData} from "./common/getOrderDetails"
export default function Welcome() {
  useEffect(() => {
    getCategoryPieData()
    getOrderData()
  }, [])
  return (
    <div className={style.box}>
      <div id="categoryPie" className={style.categoryPie}></div>
      <div id="orderPie" className={style.orderPie}></div>
      <div id="categoryPieBar" className={style.categoryPieBar}></div>
      <div className={style.footer}>Copyright © 2021-{new Date().getFullYear()} small-shop 微商城 All Rights Reserved</div>
    </div>
  )
}
