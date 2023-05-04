<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in swiperData" :key="item.id">
      <img :src="item.imgs" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import { ISwiper } from "../../type";
interface Props {
  swiperData: ISwiper[];
}

const props = withDefaults(defineProps<Props>(), {
  swiperData: () => [],
});
</script>

<style lang="less" scoped>
.my-swipe {
  width: 100%;
  height: 11.875rem;
  margin: 0.625rem 0 1.8rem;
  padding-top: 0.0625rem;
  .van-swipe-item {
    width: 100%;
    height: 100%;
    border-radius: 0.525rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.525rem;
      object-fit: cover;
    }
  }
}
</style>
