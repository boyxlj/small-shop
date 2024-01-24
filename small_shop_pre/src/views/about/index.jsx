import React,{useState} from 'react'
import UpdateTitle from '../../components/updateTitle'
import style from "./style/index.module.scss"
import Editor from './components/Editor'
import {getAbout} from "../../api/smallshop"
import { useEffect } from 'react'
import { Spin } from 'antd'
export default function About() {
  const [content,setContent] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    document.documentElement.scrollTop = 0
    aboutContent()
  },[])
  const aboutContent =async()=>{
    setLoading(true)
    const {data:res} = await getAbout().finally(()=>{
      setTimeout(() => {
        setLoading(false)
      }, 500);
    })
    if(res.code!=200) return setContent("")
    let Content = res.data[0]?.content
    setContent(Content)
  }
  return (
    <div>
      <UpdateTitle title="关于"/>
      {loading &&(
        <div className={style.loading} style={{padding:loading?'240px 0':'0'}}>
        <Spin size='large' />
      </div>
      )}
      {
        !loading &&(
          <div className={style.box}>
          <div className={style.content}>
          <div className={style.editor}>
            <Editor  content={content}/>
          </div>
          </div>
        </div>
        )
      }
     
    </div>
  )
}
