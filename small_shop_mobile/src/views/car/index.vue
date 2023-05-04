<template>
  <div class="car">
    <div class="content">
      <van-swipe-cell v-for="item in carOrderData" :key="item.detailId">
        <div class="item">
          <div class="tops">
            <div class="tops_left">
              <van-checkbox
                checked-color="#ff0000"
                :name="213"
                v-model="item.checked"
                data-carId="{{item.carId}}"
                @change="onChangeCheck(item.carId, item.checked)"
              ></van-checkbox>
            </div>
            <div class="right">
              <van-tag size="large" round type="danger" color="#cf0a2c"
                >微商城自营店</van-tag
              >
            </div>
          </div>
          <div class="center">
            <img @click="navigateDetail(item.detailId)" :src="item.titleImg" />
            <div class="center_right">
              <div @click="navigateDetail(item.detailId)" class="title">
                <span class="tag" v-if="item.tag">{{ item.tag }}</span>
                {{ item.title }}
              </div>
              <div @click="navigateDetail(item.detailId)" class="descs">
                {{ item.descs }}
              </div>
              <div class="price">
                <div>￥{{ item.price * item.num }}</div>
                <div>
                  <van-stepper
                    cf0a2c
                    v-model="item.num"
                    max="6"
                    :name="item.carId"
                    theme="round"
                    button-size="22"
                    disable-input
                    @change="onChangeNum"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <div
            @click="clickDelete(item.carId)"
            class="delete"
            bindtap="deleteCar"
          >
            删除
          </div>
        </template>
      </van-swipe-cell>
      <div class="empty" v-if="isEmpty">
        <van-empty img="search" description="您的购物车空空如也"> </van-empty>
      </div>
      <div class="likes">
        <div class="tip like">--猜你喜欢--</div>
        <ShopItem :indexShopData="randomShopData" :noTitle="true"></ShopItem>
        <!-- <shop-item-search shopData="{{likeData}}"></shop-item-search> -->
      </div>
    </div>
  </div>
  <div class="haha">
    <div class="left">
      <van-checkbox
        checked-color="#cf0a2c"
        v-model="allChecked"
        data-carId="{{allChecked}}"
        @change="allSelectChecked"
        >全选</van-checkbox
      >
    </div>
    <div class="right">
      <div class="right_top">
        <div>已选{{ totalNum }}件</div>
        <div>
          合计:<span>￥{{ totalPrice }}</span>
        </div>
      </div>
      <van-button
        icon="balance-pay"
        type="danger"
        @click="submitOrderClick"
        round
        color="#cf0a2c"
        >去结算</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getSelectCarShop,
  updateCarNum,
  removeCarShop,
  submitOrder,
} from "@/api/request";
import { emitter } from "@/utils/mitt";
import { ICarOrderData, ICarOrderParams } from "@/types/order";
import { useGetRandomShop } from "@/hooks/shop";
import { Toast, Dialog } from "vant";
const router = useRouter();
const randomData = useGetRandomShop();
const { randomShopData } = toRefs(randomData);
onMounted(() => {
  emitter.emit("updateTitle", "购物车");
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) {
    Dialog.confirm({
      title: "温馨提示",
      confirmButtonText: "跳转登录",
      message: "需要进行登录后进行操作，是否跳转登录",
    })
      .then(() => {
        router.push("/login");
      })
      .catch(() => {
        router.replace("/");
      });
  }


  carOrder();
});
Toast.allowMultiple();
const isEmpty = ref(false);
const allChecked = ref(false);
const carOrderData = ref<ICarOrderData[]>([]);
const userId = localStorage.getItem("userId") as any;

//提交订单
const submitOrderClick = async () => {
  const ret = carOrderData.value.some((item) => item.checked);
  if (!ret) return Toast.fail("请至少选择一种商品");
  const orderNum = new Date().getTime() as any;
  const orderData: ICarOrderData[] = carOrderData.value?.filter(
    (item) => item.checked
  );
  let obj: ICarOrderParams = {
    detailId: orderData,
    userId,
    orderNumber: orderNum,
  };
  const { data: res } = await submitOrder(obj);
  if (res.code != 200) return Toast.fail("订单提交失败！");
  const list = JSON.stringify(orderData);
  router.push(`/checkout?orderNumber=${orderNum}&list=${list}`);
};

//删除订单
const clickDelete = async (carId: number) => {
  Dialog.confirm({
    title: "温馨提示",
    message: "您确定要从购车中移除该商品吗？",
  })
    .then(async () => {
      const { data: res } = await removeCarShop(userId, carId);
      if (res.code != 200) return Toast.fail("移除失败！");
      Toast.success("已从购物车中移除");
      carOrder();
    })
    .catch(() => {});
};

//切换多选按钮
const onChangeCheck = async (carId: any, value: any) => {
  const res = carOrderData.value.every((item) => item.checked);
  if (res) {
    allChecked.value = true;
  } 
};

const totalNum = computed(() => {
  const t = carOrderData.value
    ?.filter((item) => item.checked)
    .reduce((total, item) => (total += item.num), 0);
  return t;
});
const totalPrice = computed(() => {
  return carOrderData.value
    ?.filter((item) => item.checked)
    .reduce((total, item) => (total += item.num * item.price), 0);
});

//全选
const allSelectChecked = (value: boolean) => {
  if (value) {
    carOrderData.value = carOrderData.value.map((item) => {
      item.checked = true;
      return item;
    });
    allChecked.value = true;
  } else {
    carOrderData.value = carOrderData.value.map((item) => {
      item.checked = false;
      return item;
    });
    allChecked.value = false;
  }
};

//切换数量
const onChangeNum = async (num: number, detail: { name: number }) => {
  allChecked.value = false;
  if (num == 1) {
    Toast("至少购买数量为1");
  } else if (num == 6) {
    Toast("最多购买数量为6");
  }
  const { data: res } = await updateCarNum(userId, num, detail.name).finally(
    () => {}
  );
  if (res.code !== 200) {
    return Toast.fail("服务异常");
  }
  carOrder();
};

//跳转商品详情
const navigateDetail = (detailId: number) => {
  router.push(`/details?detailId=${detailId}`);
};

//获取购物车订单
const carOrder = async () => {
  isEmpty.value = false;
  const toast = Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
    loadingType: "spinner",
  });
  const { data: res } = await getSelectCarShop(userId).finally(() => {
    toast.clear();
  });
  if (res.code !== 200) {
    carOrderData.value = [];
    isEmpty.value = true;
    return;
  }
  const ret = res.data.map((item: ICarOrderData) => {
    item.checked = false;
    return item;
  });
  carOrderData.value = ret;
  isEmpty.value = false;
};
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: var(--bgColor);
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 2.625rem;
  .content {
    width: 100%;
    padding: 0 0.625rem;
    box-sizing: border-box;
    .item {
      width: 100%;
      height: 10.6625rem;
      background-clip: content-box;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.625rem;
      margin-top: 0.9375rem;

      .tops {
        display: flex;
        padding: 0.625rem;
        .tops_left {
          margin-right: 0.325rem;
        }
      }
      .center {
        display: flex;
        width: 100%;
        padding: 0 0.9375rem;
        img {
          width: 6rem;
          height: 6rem;
        }
        .center_right {
          width: 58%;
          margin-left: 0.3125rem;
          .title {
            width: 100%;
            padding: 0.35rem 0rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .tag {
              // background: var(--themeColor);
              background: linear-gradient(
            to right bottom,
            rgb(158, 41, 41),
            rgb(214, 60, 60),
            rgb(120, 24, 24)
          ) ;
          border-radius: .1875rem;
              padding: 0 0.1875rem;
              color: #fff;
              font-size: 0.75rem;
              // border-radius: 0.25rem;
            }
          }
          .descs {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -moz-box;
            -moz-line-clamp: 2;
            -moz-box-orient: vertical;
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal;
            padding: 0.16rem 0;
            font-size: 0.9rem;
          }
          .price {
            margin-top: 0.4375rem;
            div {
              &:first-child {
                font-size: 1.1875rem;
              }
            }
            width: 100%;
            align-items: center;
            color: var(--themeColor);
            flex-wrap: nowrap;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
.delete {
  height: 100%;
  background-color: var(--themeColor);
  width: 4.6875rem;
  margin-left: 0.3125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.25rem;
  white-space: 0.3125rem;
  border-radius: 0.625rem;
}
.empty {
  margin-top: 3.75rem;
}
.likes {
  padding-bottom: 4.375rem;
  margin-top: 2.5rem;
  .tip {
    width: 100%;
    text-align: center;
    margin: 0.25rem 0 0.7813rem;
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
}
.haha {
  width: 100vw;
  height: 3.7rem;
  background-color: #fff;
  box-shadow: 0 -0.0625rem 0.125rem #ddd;
  box-sizing: border-box;
  position: fixed;
  bottom: 3.05rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.625rem;
  .left {
    display: flex;
  }
  .right {
    display: flex;
    align-items: center;
    .right_top {
      margin-right: 0.4688rem;
      display: flex;
      flex-direction: column;
      align-content: center;
      div {
        &:first-child {
          position: relative;
          top: -0.25rem;
        }
        &:last-child {
          position: relative;
          top: -0.4063rem;
          span {
            color: var(--themeColor);
            font-size: 1.25rem;
          }
        }
      }
    }
  }
}
</style>
