<template>
  <div class="details" v-for="item in shopDetailData" :key="item.detailId">
    <Navheader>
      <template #center>
        <div>商品详情</div>
      </template>
    </Navheader>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in shopSwiperData" :key="item.id">
        <img :src="item.imgs" alt="" />
      </van-swipe-item>
    </van-swipe>
    <div class="price">
      <div class="left">
        <span>￥{{ item.price }}</span>
        <span v-if="item.prePrice">￥{{ item.prePrice }}</span>
      </div>
      <div @click="pintuan" class="right">
        <span>拼团更优惠</span>
      </div>
    </div>
    <div class="info">
      <div class="desc1">
        <div class="ziying">微商城自营</div>
        <div class="title">
          <span v-if="item.tag" class="tag">{{ item.tag }}</span
          >{{ item.title }}/{{ item.descs }}
        </div>
        <div class="select">
          <div><van-icon class="icons" name="back-top" />推荐</div>
          <div><van-icon class="icons" name="medal-o" />积分购</div>
          <div>
            <van-icon class="icons" name="share-o" />
            分享
          </div>
        </div>
      </div>
      <div class="tip">--商品详情--</div>
      <div class="detailDesc">
        <span v-if="item.tag" class="tag">{{ item.tag }}</span
        >{{ item.detailDesc }}
      </div>
      <div class="bottom"></div>
      <div class="tip">--推荐商品--</div>
      <ShopItem :indexShopData="randomShopData" :noTitle="true"></ShopItem>
      <div class="distanceBottom"></div>
      <div class="footers">
        <div class="left">
          <div class="select" @click="contact">
            <van-icon name="chat-o" />
            <span>客服</span>
          </div>
          <div class="select" @click="navigateCar">
            <van-icon name="cart-o" />
            <span>购物车</span>
          </div>
          <div class="select" @click="clickCollect">
            <van-icon name="star-o" v-if="!collect" />
            <van-icon name="star" v-else class="icons" />
            <span v-if="!collect">收藏</span>
            <span v-else>已收藏</span>
          </div>
        </div>
        <div class="right" @click="addCar">
          <div class="addCar">加入购物车</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getShopDetail,
  getShopSwiper,
  getIsCollect,
  getAddRemoveCollect,
  getAddCollect,
  getIsAddCar,
} from "@/api/request";
import { IShopDetails } from "@/types/shop";
import { useGetRandomShop } from "@/hooks/shop";
import { useIsLogin } from "@/hooks/islogin";
import { Toast } from "vant";
import ShopItem from "@/components/shopItem/index.vue";
import "vant/es/toast/style";
const route = useRoute();
const router = useRouter();
const randomData = useGetRandomShop();
const { randomShopData } = toRefs(randomData);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const detailId: number = route.query.detailId;
type TShopSwiper = {
  id: number;
  detailId: number;
  imgs: string;
};
const shopDetailData = ref<IShopDetails[]>([]);
const shopSwiperData = ref<TShopSwiper[]>([]);
onMounted(() => {
  shopDetail();
  shopSwiper();
  isCollect();
});

watch(route, () => {
  if (route.fullPath.includes("/details")) {
    router.go(0);
  }
});

//获取商品基本信息
const shopDetail = async () => {
  const { data: res } = await getShopDetail(detailId);
  if (res.code != 200) return Toast.fail("服务异常！");
  shopDetailData.value = res.data;
};

//获取商品轮播
const shopSwiper = async () => {
  const { data: res } = await getShopSwiper(detailId);
  if (res.code != 200) return Toast.fail("服务异常！");
  shopSwiperData.value = res.data;
};

const collect = ref(false);
//判断用户是否已添加收藏
const isCollect = async () => {
  if (!localStorage.getItem("userInfo")) return (collect.value = false);
  const { data: res } = await getIsCollect(
    localStorage.getItem("userId") as any,
    route.query.detailId as any
  );
  if (res.code != 200) return (collect.value = false);
  collect.value = true;
};
//添加收藏
const addCollect = async () => {
  const { data: res } = await getAddCollect(
    localStorage.getItem("userId") as any,
    route.query.detailId as any
  );
  if (res.code != 200) return Toast.fail("添加收藏失败");
  Toast("已添加至我的收藏");
  collect.value = true;
};

//移除收藏
const removeCollect = async () => {
  const { data: res } = await getAddRemoveCollect(
    localStorage.getItem("userId") as any,
    route.query.detailId as any
  );
  if (res.code != 200) return Toast.fail("移除收藏失败");
  Toast("已从我的收藏中移除");
  collect.value = false;
};

//点击拼团活动
const pintuan = () => {
  useIsLogin();
  if (localStorage.getItem("userInfo")) {
    Toast("拼团活动敬请期待!");
  }
};

//点击联系客服
const contact = () => {
  useIsLogin();
  if (localStorage.getItem("userInfo")) {
    Toast("客服正在上线的路上!");
  }
};

//跳转购物车页面
const navigateCar = () => {
  useIsLogin();
  if (localStorage.getItem("userInfo")) {
    router.push("/shop/car");
  }
};

//点击收藏
const clickCollect = () => {
  useIsLogin();
  if (!localStorage.getItem("userInfo")) return;
  if (collect.value) {
    removeCollect();
  } else {
    addCollect();
  }
};

//点击加入购物车
const addCar = async () => {
  useIsLogin();
  if (!localStorage.getItem("userInfo")) return;
  const { data: res } = await getIsAddCar(
    localStorage.getItem("userId") as any,
    route.query.detailId as any
  );
  if (res.code === 403) return Toast("该商品已添加至购物车");
  if (res.code === 404) return Toast("添加购物车失败");
  Toast("已添加我的购物车");
};
</script>

<style lang="less" scoped>
.details {
  background: var(--bgColor);
  height: 100%;
  padding-bottom: 4.6rem !important;
  margin-bottom: 4.6rem !important;
  .my-swipe {
    background-color: #fff;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 25.5rem;
      width: 80%;
      padding: 1.875rem;
      box-sizing: border-box;
      span-align: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .price {
    width: 100%;
    height: 3.75rem;
    background-color: skyblue;
    display: flex;
    .left {
      width: 64%;
      height: 100%;
      background: linear-gradient(to right, rgb(183, 50, 50), rgb(248, 86, 86));
      display: flex;
      align-items: center;
      font-size: 1.0313rem;
      color: #fff;
      span {
        &:first-child {
          font-size: 1.5625rem;
          margin-left: 0.9375rem;
        }
        &:last-child {
          margin-left: 1.4063rem;
          span-decoration: line-through;
        }
      }
    }
    .right {
      width: 36%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(250, 208, 215);
      color: var(--themeColor);
    }
  }
  .info {
    width: 100%;
    min-height: 6.25rem;
    padding: 0 0.625rem;
    box-sizing: border-box;
    .desc1 {
      width: 100%;
      box-sizing: border-box;
      margin: 1.0938rem 0;
      padding: 0.625rem 0.9375rem;
      background-color: #fff;
      border-radius: 0.3125rem;
      .ziying {
        background-color: var(--themeColor);
        width: 5.3125rem;
        text-align: center;
        border-radius: 0.4688rem;
        color: #fff;
        padding: 0.1875rem;
        font-size: 0.9375rem;
      }
      .title {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        overflow: hidden;
        margin: 0.4688rem 0;
        .tag {
          // background: var(--themeColor);
          background: linear-gradient(
            to right bottom,
            rgb(158, 41, 41),
            rgb(214, 60, 60),
            rgb(120, 24, 24)
          );
          border-radius: 0.1875rem;
          padding: 0 0.1875rem;
          color: #fff;
          font-size: 0.75rem;
          // border-radius: .25rem;
          margin-right: 0.25rem;
        }
      }
      .select {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.625rem 0 0.4688rem;
        view {
          display: flex;
          justify-content: center;
          align-items: center;
          .icons {
            margin-right: 0.1875rem;
          }
        }
      }
    }
    .tip {
      width: 100%;
      text-align: center;
      margin: 0.625rem 0;
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
    }
    .like {
      margin-bottom: 0.9375rem;
    }
    .detailDesc {
      width: 100%;
      box-sizing: border-box;
      margin: 0.625rem 0;
      padding: 0.9375rem;
      background-color: #fff;
      border-radius: 0.3125rem;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 0.4688rem 0;
      min-height: 3.125rem;
      .tag {
        // background: var(--themeColor);
        background: linear-gradient(
          to right bottom,
          rgb(158, 41, 41),
          rgb(214, 60, 60),
          rgb(120, 24, 24)
        );
        border-radius: 0.1875rem;
        padding: 0 0.1875rem;
        color: #fff;
        font-size: 0.75rem;
        // border-radius: .25rem;
        margin-right: 0.25rem;
      }
    }
    .bottom {
      margin: 1.875rem;
    }
    .footers {
      width: 100%;
      height: 3.75rem;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      border-top: 0.125rem solid #f0f4f5;
      display: flex;
      .left {
        width: 9.9rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .select {
          display: flex;
          flex-direction: column;
          align-items: center;
          .van-icon {
            font-size: 1.3rem;
          }

          .icons {
            color: rgb(246, 177, 86);
          }
          span {
            font-size: 0.71rem;
            margin-top: 0.275rem;
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .addCar {
          width: 98%;
          height: 75%;
          margin-right: 0.605rem;
          border-radius: 1.875rem;
          background: linear-gradient(
            to right,
            rgb(183, 50, 50),
            rgb(248, 86, 86)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.9375rem;
        }
      }
    }
  }
}
</style>
