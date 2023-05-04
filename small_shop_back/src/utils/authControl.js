import { message } from "antd"
export const authControl = (show=true)=>{
  const auth = sessionStorage.getItem("secretKey")
  if(auth=='small-shop-xlj'){
    return true
  } else{
    if(show){
      message.error("您没有权限操作")
    }
    return false
  }
}

// export const authControl = ()=>{
//   return true
// }