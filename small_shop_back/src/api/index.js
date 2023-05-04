import Axios from "axios"


// Axios.defaults.baseURL = "http://localhost:3000/api"
Axios.defaults.baseURL = "https://www.11e.top/api"

Axios.interceptors.request.use(config=>{
  return config
},err=>{
  return Promise.reject(err)
})
Axios.interceptors.response.use(result=>{
  return result
},err=>{
  return Promise.reject(err)
})

export default  Axios