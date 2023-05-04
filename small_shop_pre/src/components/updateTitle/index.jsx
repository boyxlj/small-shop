import React, { useEffect } from 'react'
export default function UpdateTitle(props) {
  const {title} = props
  useEffect(()=>{
    document.title = title
  },[])
  return (
    <div></div>
  )
}
