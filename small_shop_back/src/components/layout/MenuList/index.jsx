import React from 'react'
import style from "./style/index.module.scss"
import { useNavigate,useLocation } from "react-router-dom"
import { Menu } from 'antd';
import menuList from '../../../utils/menuList';
export default function MenuList(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { collapsed } = props
  let path =null 
  location.pathname=="/"?path = "/small-shop/statistics":path=location.pathname
  //切换菜单项
  const clickMenuItem = (value) => {
    navigate(value.key)
  }
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={path}
      onClick={clickMenuItem}
      style={{ paddingTop: collapsed ? '60px' : '' }}
      items={menuList}
    />
  )
}
