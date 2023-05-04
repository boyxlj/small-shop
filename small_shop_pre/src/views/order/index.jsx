import React from 'react'
import { Outlet ,NavLink} from 'react-router-dom'
import UpdateTitle from '../../components/updateTitle'
import style from "./style/index.module.scss"

export default function Order() {
  return (
    <div className={style.box}>
      <UpdateTitle title="我的订单"/>
      <div className={style.order}>
        <div className={style.left}>
          <div className={style.list}>
            <h2>订单中心</h2>
            <NavLink to="orderList" className={({isActive})=>isActive?style.orderActive:''}>我的订单</NavLink>
          </div>
          <div className={style.list}>
            <h2>个人中心</h2>
            <NavLink to="profile" className={({isActive})=>isActive?style.orderActive:''}>我的个人中心</NavLink>
          </div>
        </div>
        <div className={style.right} >
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
