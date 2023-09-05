import Axios from "axios"
// Axios.defaults.baseURL = "http://localhost:3000/api"
Axios.defaults.baseURL = "https://www.11e.top/api"

Axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token")
  if(token){
    config.headers.Authorization = token
  }
  return config
},(err)=>{
  return Promise.reject(err)
})
Axios.interceptors.response.use((res)=>{
  return res
},(err)=>{
  return Promise.reject(err)
})
export default Axios