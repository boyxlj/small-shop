<template>
  <div class="me">
    <div class="top-box">
      <div class="login" v-if="loginSuccess">
        <div class="left">
          <img :src="avatar" alt="" />
          <div>{{ name }}</div>
        </div>
        <div class="right">
          <van-icon @click="cancelLogin" class="icons" name="cross" />
        </div>
      </div>
      <div class="login" v-if="!loginSuccess">
        <div class="left">
          <img
            src="https://api.helloxlj.top/public/static/file1657851664917400322337.png"
            alt=""
          />
          <div @click="clickLogin">立即登录</div>
        </div>
        <div class="right">
          <van-icon @click="clickLogin" class="icons" name="play" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="collect-box">
        <div class="itemss" @click="clickCollect">
          <div><van-icon class="iconsss" name="star-o" /></div>
          <span>收藏夹</span>
        </div>
        <div class="itemss" @click="clickDetail('关注店铺为空')">
          <div><van-icon class="iconsss" name="notes-o" /></div>
          <span>关注店铺</span>
        </div>
        <div class="itemss" @click="clickDetail('浏览记录为空')">
          <div><van-icon class="iconsss" name="underway-o" /></div>
          <span>我的足迹</span>
        </div>
      </div>
      <div class="info" @click="navigateAbout">
        <div>关于微商城</div>
      </div>
      <div class="order">
        <div class="top">
          <span>我的订单</span>
          <div @click="navigateOrder(0)">
            查看所有订单<van-icon class="icons" name="arrow" />
          </div>
        </div>
        <div class="bottoms">
          <div @click="navigateOrder(1)">
            <van-icon name="paid" />
            <span>待付款</span>
          </div>
          <div @click="navigateOrder(2)">
            <van-icon name="peer-pay" />
            <span>待发货</span>
          </div>
          <div @click="navigateOrder(3)">
            <van-icon name="logistics" />
            <span>待收货</span>
          </div>
          <div @click="navigateOrder(4)">
            <van-icon name="smile-comment-o" />
            <span>待评价</span>
          </div>
        </div>
      </div>
      <div class="money">
        <div class="top">
          <span>我的资产</span>
          <div @click="clickDetail('账户余额为99999元')">
            查看我的余额<van-icon class="icons" name="arrow" />
          </div>
        </div>
        <div class="bottoms">
          <div @click="clickDetail('钱包为0')">
            <van-icon name="pending-payment" />
            <span>钱包</span>
          </div>
          <div @click="clickDetail('优惠券为空')">
            <van-icon name="balance-pay" />
            <span>优惠券</span>
          </div>
          <div @click="clickDetail('积分为0')">
            <van-icon name="points" />
            <span>积分</span>
          </div>
          <div @click="clickDetail('充值卡为0')">
            <van-icon name="idcard" />
            <span>充值卡</span>
          </div>
        </div>
      </div>

      <div class="likes">
        <div class="tip like">--猜你喜欢--</div>
        <div class="shopItem">
          <ShopItem :indexShopData="randomShopData" :noTitle="true"></ShopItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { useGetRandomShop } from "@/hooks/shop";
import { Dialog, Toast } from "vant";
import { TUser } from "@/types/user";
import { useIsLogin } from "@/hooks/islogin";
const router = useRouter();
const loginSuccess = ref(false);
const name = ref("");
const avatar = ref("");
const randomData = useGetRandomShop();
const { randomShopData } = toRefs(randomData);

onActivated(() => {
  emitter.emit("updateTitle", "我的");
  const userInfo: TUser = JSON.parse(localStorage.getItem("userInfo") as any);
  if (userInfo) {
    loginSuccess.value = true;
    name.value = userInfo.name;
    avatar.value = userInfo.avatar;
  } else {
    loginSuccess.value = false;
  }
});
onMounted(() => {
  emitter.emit("updateTitle", "我的");
  const userInfo: TUser = JSON.parse(localStorage.getItem("userInfo") as any);
  if (userInfo) {
    loginSuccess.value = true;
    name.value = userInfo.name;
    avatar.value = userInfo.avatar;
  } else {
    loginSuccess.value = false;
  }
});

//取消登录
const cancelLogin = () => {
  Dialog.confirm({
    title: "温馨提示",
    message: "您确定要退出登录嘛",
    confirmButtonColor: "#cf0a2c",
  })
    .then(() => {
      loginSuccess.value = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userId");
      localStorage.removeItem("path");
    })
    .catch(() => {});
};

//点击登录
const clickLogin = () => {
  router.push("/login");
};
//点击收藏
const clickCollect = () => {
  useIsLogin();
  if (loginSuccess.value) {
    router.push("/collect");
  }
};

//跳转订单页面
const navigateOrder = (num: number) => {
  useIsLogin();
  if (loginSuccess.value) {
    router.push(`/order?num=${num}`);
  }
};
//点击展示其他详情
const clickDetail = (value: string) => {
  useIsLogin();
  if (loginSuccess.value) {
    Toast(`您的${value}`);
  }
};

//跳转关于页面
const navigateAbout = () => {
  router.push(`/about`);
};
</script>

<style lang="less" scoped>
.me {
  background: var(--bgColor);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .top-box {
    width: 100%;
    height: 10.7625rem;
    background-image: linear-gradient(
      to right bottom,
      white,
      rgb(255, 65, 65),
      rgb(253, 88, 37),
      red,
      white
    );
    box-sizing: border-box;
    overflow: hidden;

    .login {
      height: 6.25rem;
      width: 100%;
      margin-top: 1.5625rem;
      display: flex;
      padding: 0 1.25rem;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 4.375rem;
          height: 4.375rem;
          border: 0.25rem solid #fff;
          border-radius: 50%;
          object-fit: cover;
        }
        div {
          flex: 1;
          margin-left: 0.8125rem;
          font-size: 1.0563rem;
          width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #fff;
        }
      }
      .right {
        .icons {
          font-size: 1.7188rem;
          color: #fff;
        }
      }
    }
  }

  .bottom {
    width: 100%;
    min-height: 4.075rem;
    padding: 0 0.745rem;
    box-sizing: border-box;
    .collect-box {
      position: relative;
      top: -2.1875rem;
      background-color: orange;
      background-image: linear-gradient(
        to right bottom,
        rgb(17, 17, 160),
        rgb(59, 59, 238),
        blue
      );
      padding: 1.4063rem 1.875rem;
      box-sizing: border-box;
      border-radius: 0.625rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4.6875rem;
    
      .itemss {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: orange;
        padding: 0.7813rem 0;
        box-sizing: border-box;
        div {
          .iconsss {
            color: orange;
            font-size: 1.6625rem !important;
          }
        }
        span {
          color: #fff;
          margin-top: 0.5625rem;
          font-size: 0.8575rem;
        }
      }
    }
    .info {
        position: relative;
        top: -1rem;
        width: 100%;
        height: 2.875rem;
        background-color: #fff;
        border-radius: 0.625rem;
        padding: 0.625rem 0.9813rem;
        box-sizing: border-box;
        margin-bottom: 1.875rem;
        padding-top: 0.8rem;
        padding-left: 1.1rem;
      }

    .order,
    .money {
      width: 100%;
      height: 8.875rem;
      background-color: #fff;
      border-radius: 0.625rem;
      padding: 0.625rem 0.9813rem;
      box-sizing: border-box;
      position: relative;
      top: -1.8rem;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.0938rem solid #dddddd;
        padding: 0.5rem 0 0.8125rem 0;
        div {
          color: #aaa;
          font-size: 0.9375rem;
        }
      }

      .bottoms {
        width: 100%;
        display: flex;
        height: 5rem;
        justify-content: space-between;
        align-items: center;

        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0.625rem;
          box-sizing: border-box;
          .van-icon {
            font-size: 1.6125rem;
            margin-bottom: 0.45rem;
          }
          span {
            font-size: 0.8375rem !important;
          }
        }
      }
    }

    .money {
      margin-top: 1.0313rem;
    }
    .order {
      .bottoms {
        div {
          div {
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
    }

    .likes {
      .tip {
        width: 100%;
        text-align: center;
        margin: 0.25rem 0 0.963rem;
        background-image: linear-gradient(
          to right bottom,
          rgb(241, 33, 33),
          rgb(228, 52, 219),
          black,
          orange
        );
        -webkit-background-clip: text;
        color: transparent;
        font-weight: 540;
        box-sizing: border-box;
        overflow: hidden;
      }
      .shopItem {
        padding-bottom: 4.6rem;
      }
    }
  }
}
</style>
