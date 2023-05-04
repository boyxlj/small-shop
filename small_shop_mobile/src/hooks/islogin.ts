import { ref } from "vue"
import { Dialog } from "vant"
import router from "@/router/index"
export function useIsLogin() {
  const isLogin = ref(false)
  const userInfo = localStorage.getItem("userInfo")
  if (!userInfo) {
    // isLogin.value = false
    Dialog.confirm({
      title: '温馨提示',
      confirmButtonText:"确认",
      confirmButtonColor:"#cf0a2c",
      message:
        '需要进行登录后进行操作，是否跳转登录',
    })
      .then(() => {
        router.push("/login")
      })
      .catch(() => { });
  } else {
    isLogin.value = true
  }
}