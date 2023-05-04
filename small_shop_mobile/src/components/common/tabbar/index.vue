<template>
  <van-tabbar  @change="changeTab" v-model="active" active-color="#cf0a2c" inactive-color="#000">
    <van-tabbar-item
      v-for="(item, index) in tabList"
      :icon="item.icon"
      :key="index"
    >
      {{ item.name }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup lang="ts">

type TabList = {
  icon: string;
  path: string;
  name: string;
};

const tabList: TabList[] = [
  { icon: "home-o", path: "/shop/home", name: "首页" },
  { icon: "apps-o", path: "/shop/category", name: "分类" },
  { icon: "shopping-cart-o", path: "/shop/car", name: "购物车" },
  { icon: "user-o", path: "/shop/profile", name: "我的" },
];

const active = ref(0);
const router = useRouter()
const route = useRoute()

onMounted(()=>{
  const index:number = tabList.findIndex(item=>item.path===route.fullPath)
  active.value = index
})

onActivated(()=>{
  const index:number = tabList.findIndex(item=>item.path===route.fullPath)
  active.value = index
})

//切换tab
const changeTab = (act: number | string) => {
  active.value  = act as number
  router.push(tabList[active.value].path)
};
</script>

<style lang="less" scoped></style>
