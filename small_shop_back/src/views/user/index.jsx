import React from 'react'
import UserTable from './components/userTable'
import UserDialog from './components/dialog'
import {selectAllUser} from "../../api/request"
import { useState } from 'react'
import { useEffect } from 'react'
import {Button} from "antd"
import style from "./style/index.module.scss"
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux/es/exports'
import { changeIsShow } from './store'
export default function User() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData,setUserData] = useState([])
  const [pageOn,setPageOn] = useState(1)
  const [loading,setLoading] =useState(false) 

  useEffect(()=>{
    setLoading(true)
    const storePageOn = sessionStorage.getItem("UserListPage")
    if(storePageOn){
      setPageOn(storePageOn)
    }else{
      setPageOn(1)
    }
    getUserData()
  },[])

  //获取用户列表
  const getUserData = async ()=>{
    const {data:res} = await selectAllUser().finally(()=>{
      setLoading(false)
  })
    if(res.code!=200) return setUserData([])
    setUserData(res.data)
  }


  //添加或者修改后更新数据
  const reLoad = ()=>{
    getUserData()

  }

  //点前所在的页面
  const getPageOn = (value)=>{
    sessionStorage.setItem("UserListPage",value)
    setPageOn(value)
  }

  //添加用户
  const addUser = ()=>{
    dispatch(changeIsShow({isShow:true}))
  }
  return (
    <div>
      <div className={style.add}>
        <Button onClick={addUser} type='primary'>添加用户</Button>
      </div>
      <UserTable loading={loading} getPageOn={(value)=>getPageOn(value)} pageOn={pageOn}  reLoad={reLoad} userData={userData}/>
      <UserDialog reLoad={reLoad}/>
    </div>
  )
}
