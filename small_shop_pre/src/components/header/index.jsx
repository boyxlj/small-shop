import React, { useState, useMemo, useEffect } from 'react'
import style from "./style/index.module.scss"
import { useNavigate, useLocation } from 'react-router-dom'
import { changeLoginDialogShow, setPrePath, changeRegisterDialogShow, isSureLogin } from '../../store/reducer/login'
import { setPageOn } from '../../views/goods/store/pageNation'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Dropdown, Menu, Modal, Tabs, Input } from "antd"
import PubSub from 'pubsub-js'
import "../../assets/css/iconfont/iconfont.css"
const { Search } = Input;
const { confirm } = Modal;
const { TabPane } = Tabs;

export default function Header() {
  const carTotal = useSelector(state => state.global.carTotal)
  const sureLogin = useSelector(state => state.loginDialog.sureLogin)
  const userName = useSelector(state => state.userInfo.name)
  const avatar = useSelector(state => state.userInfo.avatar)
  const dispatch = useDispatch()
  const router = useNavigate()
  const location = useLocation()
  const [inputContent, setInputValue] = useState("")
  //搜索按下回车或点击搜索按钮
  const onSearch = (value) => {
    if (!value) return
    dispatch(setPageOn(1))
    router(`/goods?keyword=${value}`)
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value)

  }

  useEffect(() => {
    var pub1 = PubSub.subscribe("changeInput", (name, val) => {
      setInputValue(val)
    })
    var pub2 = PubSub.subscribe("changeInputAndClear", () => {
      setInputValue("")
    })

    return ()=>{
      PubSub.unsubscribe(pub1)
      PubSub.unsubscribe(pub2)
    }
  }, [])





  const login = (e) => {
    e.preventDefault()
    dispatch(changeLoginDialogShow())
  }
  const register = (e) => {
    e.preventDefault()
    dispatch(changeRegisterDialogShow())
  }

  const completeLogin = (e) => {
    e.preventDefault()
  }
  const tiao = (e, value) => {
    e.preventDefault()
    if (!sureLogin) {
      dispatch(changeLoginDialogShow())
      dispatch(setPrePath(value))
    } else {
      router(value)
    }
  }
  const cancelLogin = (e) => {
    e.preventDefault()
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '确认退出登录嘛?',
      okText: "确认退出",
      cancelText: "取消",
      centered: true,
      onOk() {
        dispatch(isSureLogin())
        dispatch(setPrePath(""))
        localStorage.removeItem("token")
        localStorage.removeItem("persist:root")
        router("/")
      },
      onCancel() {
      },
    });


  }
  //跳转个人中心
  const profile = (e) => {
    e.preventDefault()
    router("/order/profile")
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" href='#' onClick={(e) => profile(e)} >
              个人中心
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a href='#' onClick={(e) => cancelLogin(e)}>
              退出登录
            </a>
          ),
        },
      ]}
    />
  );
  //切换选项卡
  const onChange = (key) => {
    router(key)
  };

  const [time, setTime] = useState("")
  //倒计时
  const timer = () => {
    setTimeout(() => {
      setTime(new Date().toLocaleString().replaceAll("/", "-"))
    }, 1000)
  }

  useEffect(() => {
    timer()
  }, [time])

  //点击logo
  const clickLogo = () => {
    router("/")
  }
  return (

    <div className={style.box}>
      <div className={style.headers}>
        <div className={style.logo} onClick={clickLogo}></div>
        {time && (<div className={style.timer}>
          当前时间: {time}
        </div>)}
        <ul>
          {!sureLogin ? (<li>
            <a href="#" onClick={(e) => { login(e) }}>登录</a>
            <span>|</span>
            <a href="#" onClick={(e) => { register(e) }}>注册</a>
          </li>) : (<li>
            <Dropdown overlay={menu} placement="bottom" arrow>
              <div style={{ display: "flex" }}>
                <div className={style.userImg}>
                  <img src={avatar} alt="" />
                </div>
                <a href="#" onClick={(e) => { completeLogin(e) }}>{userName}</a>
              </div>
            </Dropdown>
          </li>)}
          <li> <a href="#" onClick={(e) => { tiao(e, "/order/orderList?orderTabsParams=allOrders") }}>我的订单</a></li>
          <li> <a href="#" onClick={(e) => { tiao(e, "/collect") }}>我的收藏</a></li>
          <li className={style.cars} onClick={(e) => { tiao(e, "/car") }}>
            <i className='iconfont icon-gouwuche'></i>
            <a href="#"  >购物车</a>
            <span>{"("} {sureLogin ? carTotal : 0} {")"}</span>
          </li>
        </ul>
        <div className={style.tabsAndInputBox}>
        <span className={style.left} >Small Shop</span>,
          <Tabs
            className={style.tabs}
            size="large"
            defaultActiveKey={location.pathname}
            activeKey={location.pathname}
            onChange={onChange}>
            <TabPane tab="首页" key="/"></TabPane>
            <TabPane tab="全部商品" key="/goods"></TabPane>
            <TabPane tab="关于微商城" key="/about"></TabPane>
          </Tabs>
          <Search
            placeholder="请输入搜索商品信息"
            className={style.searchInput}
            onSearch={onSearch}
            maxLength="12"
            allowClear={true}
            onChange={onChangeInput}
            size="large"
            value={inputContent}
            style={{
              width: 310,
            }} />
        </div>


      </div>
    </div>
  )
}
