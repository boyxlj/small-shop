<template>
  <div class="category">
    <van-sidebar color="#cf0a2c" class="sidebar" v-model="active" >
      <van-sidebar-item :disabled="disable" @click="change(item.detailId)" v-for="item in categoryData" :key="item.detailId" :title="item.categoryName+''" />
    </van-sidebar>
    <div class="shop">
      <div class="item" @click="navigateDetail(item.detailId)" v-for="item in categoryShopData" :key="item.detailId" >
        <img :src="item.titleImg" alt="" />
        <p>{{item.title}}</p>
        <span class="tag" v-if="item.tag">{{item.tag}}</span>
      </div>
      <van-empty class="empty" v-show="empty" image="error" description="暂无商品" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { Toast } from "vant";
import { TCategoryReq } from "@/types/category";
import {IIndexData} from "@/types/shop"
import { getCategory, getCategoryShop } from "@/api/request";
const router = useRouter()
Toast.allowMultiple();

onActivated(()=>{

  emitter.emit("updateTitle", "商品分类");
})
onMounted(() => {
  emitter.emit("updateTitle", "商品分类");
  category();
});
const req = reactive<TCategoryReq>({
  detailId: 1,
  pageOn: 1,
  pageCount: 59,
});

const categoryData = ref<IIndexData[]>([]);
const categoryShopData = ref<IIndexData[]>([]);
const empty = ref(false)
const disable = ref(false)

//获分类数据
const category = async () => {
  const { data: res } = await getCategory();
  if (res.code != 200) return Toast.fail("服务异常！");
  categoryData.value = res.data;
  req.detailId = res.data[0].detailId
  categoryShop();

};

//获取分类下的商品数据
const categoryShop = async () => {
  empty.value= false
  disable.value = true
  const toast =Toast.loading({
   message: '加载中...',
  duration:0,
  forbidClick: true,
  loadingType: 'spinner',
});
  const { data: res } = await getCategoryShop(req).finally(()=>{
    toast.clear()
    disable.value = false
  }
  );
  if (res.code != 200) {
    categoryShopData.value = [];
    empty.value= true
    return;
  }
  categoryShopData.value = res.data;
};


const active = ref(0);
const change = (detailId: number) => {
  req.detailId = detailId
  categoryShop();
}

//跳转商品详情
const navigateDetail = (detailId:number)=>{
  router.push(`/details?detailId=${detailId}`)
} 
</script>

<style lang="less" scoped>
.category {
  background-color: var(--bgColor);
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  .sidebar {
    height: 89%;
    // width: 5.2rem;
    width: 22%;
    background: #f5f6f8;
    position: fixed;
    left: 0;
    top: 40px;
    overflow-y:scroll !important;
  }
  .shop {
    height: 89vh;
    width: 78%;
    position: fixed;
    left: 5.4rem;
    top: 2.5rem;
    right: 0;
    overflow-y:scroll !important;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.3375rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-content: flex-start;
    margin-bottom: 100px;
    overflow-y:scroll;
    padding-top: 1.325rem;
    &::after {
      content: '';
      width: 30%;
    }
    .item {
      width: 5.425rem;
      height: 5.325rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 0.125rem;
      box-sizing: border-box;
      margin: 0.625rem 0.125rem;
      position: relative;
      .tag{
        position: absolute;
        // background: var(--themeColor);
        background: linear-gradient(
            to right bottom,
            rgb(158, 41, 41),
            rgb(214, 60, 60),
            rgb(120, 24, 24)
          ) ;
          border-radius: .1875rem;
        padding: 0 .1875rem;
        color: #fff;
        font-size: .75rem;
        // border-radius: .25rem;
        right: 0;
        top: -0.825rem;
      }
  
      img {
        width: 3.8rem;
        height: 3.8rem;
        object-fit: cover;
        border: 1px solid #fff;
      }
      p {
        margin-top: 0.3125rem;
        width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.7rem;
      }
    }
  }
  .empty{
    margin-left:6rem;
    position: fixed;
    left: 0;
    top: -3.78rem;
    right: 0;
    height: 100vh;
    bottom: 0;
    background: #fff;
  }
}
</style>
