<template>
  <div class="login">
    <div class="contain">
      <div class="title">微商城</div>
      <van-form @submit="onSubmit" class="from">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="账号"
            placeholder="账号"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="danger" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="footer">Copyright © 2021-2022  微商城 </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {LoginForm} from "@/types/login"
  import {login} from "@/api/request"
import { Toast } from "vant";
const router = useRouter()
const route = useRoute()
const username = ref("");
const password = ref("");

const onSubmit =async (values:LoginForm) => {
  const {data:res} = await login(values)
  if(res.code===403) return Toast.fail("账号不存在")
  if(res.code===404) return Toast.fail("账号或密码不存在")
  Toast.success("登录成功")
  localStorage.setItem("userInfo",JSON.stringify(res.data[0]))
  localStorage.setItem("userId",res.data[0].userId)
  const path= localStorage.getItem("path")
  if(path){
    router.replace(path)
    localStorage.removeItem("path")
  }else{
    router.replace("/shop/profile")
  }
};



onUnmounted(()=>{
  const path= localStorage.getItem("path")
  if(!localStorage.getItem("userInfo")){
    router.replace("/")
    if(path){
      router.replace(path)
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .contain {
    width: 85%;
    height: 22.25rem;
    box-shadow: 0 0 1.25rem #eee;
    border-radius: .625rem;
    text-align: center;
    padding: 2rem 1.05rem;
    box-sizing: border-box;
    .title {
      font-size: 1.875rem;
    }
    .from{
      width: 100%;
      margin-top: 1.875rem;
    }
    .footer{
      margin-top: 2rem;
      font-size: 0.6rem;
    }
  }
}
</style>
