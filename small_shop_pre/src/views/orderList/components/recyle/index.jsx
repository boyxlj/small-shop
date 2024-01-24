import React from 'react'
import style from "./style/index.module.scss"
import { useEffect,useState } from 'react'
import { Spin,Empty } from 'antd'
export default function Recyle() {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },400)
  },[])
   
  return (
    <>
    {loading &&(
      <div className={style.loading} style={{padding:loading?'140px 0':'0'}}>
       <Spin size='large' />
    </div>
    )}
    {!loading&&(
      <Empty style={{marginTop:"90px"}} description="暂无数据" />
    )}
  </>
  )
}
