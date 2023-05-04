<template>
  <div class="box">
    <template v-for="item in indexShopData" :key="item.detailId">
      <div v-if="item.children">
        <div class="shop_category" >
          <span >{{ item.categoryName }}专区</span>
        </div>
        <div class="shop">
          <div
            class="shopItem"
            @click="navigateDetails(shopItem.detailId)"
            v-for="shopItem in item.children?.slice(0, 8)"
            :key="shopItem.detailId"
          >
            <img :src="shopItem.titleImg" />
            <div class="title">
              <span class="tag" v-if="shopItem.tag">{{ shopItem.tag }}</span>
              {{ shopItem.title }}/{{ shopItem.descs }}
            </div>
            <div class="price">
              <span class="nowPrice">￥{{ shopItem.price }}</span>
              <span class="prePrice" v-if="shopItem.prePrice"
                >￥{{ shopItem.prePrice }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-if="noTitle">
      <div class="shop">
        <div
          class="shopItem"
          @click="navigateDetails(item.detailId, true)"
          v-for="item in indexShopData"
          :key="item.detailId"
        >
          <img :src="item.titleImg" />
          <div class="title">
            <span class="tag" v-if="item.tag">{{ item.tag }}</span>
            {{ item.title }}/{{ item.descs }}
          </div>
          <div class="price">
            <span class="nowPrice">￥{{ item.price }}</span>
            <span class="prePrice" v-if="item.prePrice"
              >￥{{ item.prePrice }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IIndexData } from "@/types/shop";
const router = useRouter();
type Props = {
  indexShopData: IIndexData[];
  noTitle?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  indexShopData: () => [],
  noTitle: false,
});

//跳转商品详情
const navigateDetails = (detailId: number, refresh?: boolean) => {
  router.push(`/details?detailId=${detailId}`);
};

</script>

<style lang="less" scoped>
.box {
  padding-bottom: 1.625rem;
  &:last-child {
    padding-bottom: 0.625rem;
  }
  .shop_category {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.425rem 0;
    span {
      padding: 0.3125rem 1.5625rem;
      font-weight: bold;
      background-image: linear-gradient(
        to right bottom,
        rgb(241, 33, 33),
        rgb(228, 52, 219),
        black,
        orange
      );
      -webkit-background-clip: text;
      color: transparent;
      border: 0.0625rem solid;
      border-image: linear-gradient(red, yellow, blue) 1 10;
      clip-path: inset(0 round 10px);
    }
  }
  .shop {
    width: 100%;
    min-height: 18.75rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .shopItem {
      width: 48.9%;
      height: 15.625rem;
      border-radius: 0.3125rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5225rem 0.8688rem;
      box-sizing: border-box;
      margin-bottom: 0.725rem;
      img {
        width: 8.75rem;
        height: 9.6375rem;
        margin-bottom: 0.7813rem;
        object-fit: cover;
      }
      .title {
        width: 100%;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        overflow: hidden;
        height: 2.3888rem;
        font-size: 0.875rem;
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
        }
      }
      .price {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 0.625rem;
        align-items: center;
        .nowPrice {
          color: var(--themeColor);
        }
        .prePrice {
          text-decoration: line-through;
          font-size: 0.8125rem;
        }
      }
    }
  }
}
</style>
