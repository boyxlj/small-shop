<template>
  <keep-alive>
    <div class="search">
      <Navheader>
        <template #center>
          <div>商品搜索</div>
        </template>
      </Navheader>
      <van-sticky :offset-top="51">
        <van-search
          class="searchs"
          autofocus
          v-model="key"
          @search="search"
          @blur="search"
          @clear="clear"
          placeholder="请输入关键词按下回车键查询商品"
        />
      </van-sticky>
      <van-empty image="search" v-if="isEmpty" description="暂无当前搜索商品" />
      <div class="data">
        <ShopItem :indexShopData="searchShopData" :noTitle="true"></ShopItem>
      </div>
    </div>
  </keep-alive>
</template>

<script setup lang="ts">
import { getSearchShop } from "@/api/request";
import { IIndexData, ISearch } from "@/types/shop";
import { Toast } from "vant";
const key = ref("");
const isEmpty = ref(false);
const searchShopData = ref<IIndexData[]>([]);
Toast.allowMultiple();
//失去焦点或按下回车键开始搜索
const search = async () => {
  if (!key.value) return 
  isEmpty.value = false;
  const toast1 = Toast.loading({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 0,
  });
  const obj: ISearch = {
    key: key.value,
    pageOn: 1,
    pageCount: 50,
  };
  const { data: res } = await getSearchShop(obj).finally(() => {
    toast1.clear();
  });
  if (res.code != 200) {
    searchShopData.value = [];
    isEmpty.value = true;
    return;
  }
  searchShopData.value = res.data;
};


//点击清空
const clear = () => {
  isEmpty.value = false;
  searchShopData.value = [];
};
</script>

<style lang="less" scoped>
.search {
  background: var(--bgColor);
  min-height: 100vh;
  height: 100%;
  .searchs {
    margin-bottom: 0.625rem;
  }
  .data {
    padding: 0 0.4775rem;
  }
}
</style>
