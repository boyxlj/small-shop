<template>
  <div class="order">
    <Navheader>
      <template #center>
        <div>我的订单</div>
      </template>
    </Navheader>
    <van-sticky :offset-top="50">
    <van-tabs color="#cf0a2c" @change="changeTab" v-model:active="active" swipeable>
        <van-tab v-for="item in tabList" :key="item.id" :title="item.name"></van-tab>
      </van-tabs>
    </van-sticky>
      <div class="box">
  <div class="item" v-for="(item,index) in orderData" :key="index" >
    <div class="logos"><van-tag size="large" round type="danger" color="#cf0a2c">微商城自营店</van-tag><div class="success">{{item.type=='2'?'等待付款':'交易成功'}}</div></div>
    <div class="shopList" @click="navigateDetail(item1.detailId)"  v-for="item1 in item.orderList" :key="item1.orderId" >
      <img :src="item1.titleImg" />
      <div class="right">
        <div class="title"><span class="tag" v-if="item1.tag">{{item1.tag}}</span>{{item1.title}}/{{item1.descs}}</div> 
        <div class="price"><span>￥{{item1.price}}</span><span>x{{item1.num}}</span></div>
      </div>
    </div>
    <div class="btns">
      <div class="left">
        <!-- <van-button  size="small"  @click="navigeOrderDetail(item.orderNumber)"  round color="#cf0a2c">订单详情</van-button> -->
      </div>
      <div class="right">
        <van-button  size="small"  @click="deleteOrder(item.orderNumber)"  round>删除订单</van-button>
        <van-button  @click="pay(item.orderNumber)" size="small" style="margin-left:.825rem;" v-if="item.type=='2'"  type="danger" color="#cf0a2c" round>立即支付</van-button>

      </div>
    </div>
  </div>
  <van-empty class="empty" v-if="isEmpty" image="search" description="暂无订单详情" />
  <van-dialog use-slot title="请扫码支付"  v-model:show="payDialogShow" show-cancel-button  @confirm="confirmPay"  confirmButtonColor="#cf0a2c" confirmButtonText="我已支付" @cancel="cancelPay">
  <div style="width: 100%;height: 12.5rem; padding: 1.875rem 0; display: flex;justify-content: center;" class="pays">
    <img style="width: 12.5rem;height: 100%;" src="https://api.helloxlj.top/public/static/file1662721153697790690611.png" />
  </div>
</van-dialog>
</div>

  </div>
  
</template>


<script setup lang="ts">
  import {getSelectOrderAll,getDeleteOrder,setOrderState} from "@/api/request"
  import {IOrderData} from "@/types/order"
import { Toast,Dialog } from "vant";
  Toast.allowMultiple();
const route = useRoute()
const router =useRouter()
const active = ref(0);
const type = ref(0);
const tabList = ref<{
  id:number,
  name:string
}[]>([
  {id:0,name:"全部订单"},
  {id:1,name:"待付款"},
  {id:2,name:"待发货"},
  {id:3,name:"待收货"},
  {id:4,name:"待评价"},
])
const orderData = ref<IOrderData[]>([])
const isEmpty = ref(false)
const payDialogShow = ref(false)
const orderNumber = ref('')
const VanDialog = Dialog.Component;

onMounted(()=>{
  getNum()
 
})


const getNum = ()=>{
  let num = route.query.num as any
  if(num===1){
    type.value =2
  }else if(num===2){
    type.value =3
  }else if(num===0){
    type.value =0
  }else{
    type.value =4
  }
  active.value = num
  selectOrderAll(active.value)
}



onActivated(()=>{
  getNum()
  
})



//切换tab
const changeTab = (num:number)=>{
  if(num===1){
    type.value =2
  }else if(num===2){
    type.value =3
  }else if(num===0){
    type.value =0
  }else{
    type.value =4
  }
  selectOrderAll(type.value)
}



//查询用户订单
const selectOrderAll=async (active:number)=>{
  if(active==4){
    orderData.value = []
    isEmpty.value = true
    return 
  }
  isEmpty.value = false
  const toast =Toast.loading({
   message: '加载中...',
  duration:0,
  forbidClick: true,
  loadingType: 'spinner',
});
  const {data:res} = await getSelectOrderAll(
    localStorage.getItem("userId") as any,active
  ).finally(()=>{
    toast.clear()
  })
  if(res.code!==200){
    orderData.value = []
    isEmpty.value = true
    return 
  }
  orderData.value = res.data
    isEmpty.value = false
}

//立即支付订单
const pay = async(orderNumbers:string)=>{
  orderNumber.value = orderNumbers
  payDialogShow.value=true

}


//确认支付
const confirmPay = async()=>{
  const toast1  = Toast.loading({
  message: '支付校验中...',
  forbidClick: true,
  loadingType: 'spinner',
  duration:0
});
payDialogShow.value=false
const {data:res} = await setOrderState(orderNumber.value,"3")
setTimeout(()=>{
  toast1.clear()
  Dialog.alert({
  title: '支付结果',
  message: '恭喜你支付成功',
  confirmButtonColor:"#cf0a2c"
}).then(async() => {
  selectOrderAll(active.value)
});
},2000)
}
//取消支付
const cancelPay = async()=>{
  payDialogShow.value=false
  orderNumber.value=""
  
}



//删除订单
const deleteOrder = async(orderNumber:string)=>{
  Dialog.confirm({
  title: '温馨提示',
  message:
    '您确定要永久删除此订单吗？',
    confirmButtonColor:"#cf0a2c"
})
  .then(async() => {
    const {data:res} = await getDeleteOrder(orderNumber)
    if(res.code!=200) return Toast.fail('订单删除失败')
    Toast.success('订单删除成功')
    selectOrderAll(type.value)
  })
  .catch(() => {});
}

//跳转商品详情
const navigateDetail = (detailId:number)=>{
  router.push(`/details?detailId=${detailId}`)
}

//跳转订单详情
const navigeOrderDetail = (orderNumber:string)=>{
  router.push(`/orderDetail?orderNumber=${orderNumber}`)
}


</script>


<style lang='less' scoped> 
.order{
  height: 100%;
  min-height: 100vh;
  background: var(--bgColor);
  width: 100%;
  box-sizing: border-box;
  padding-bottom: .625rem;
  .box{
  width: 100%;
  min-height: 9.375rem;
  padding: 0 .625rem;
  box-sizing: border-box;
  background-clip: content-box;
  margin-top: .625rem;
  .item{
    width: 100%;
    min-height:13.125rem ;
    background-color: #fff;
    overflow: hidden;
    border-radius: .625rem;
    padding: .7813rem;
    box-sizing: border-box;
    margin-bottom: .9375rem;
    .logos{
      margin: .3125rem 0 .4688rem .4688rem;
      display: flex;
      justify-content: space-between;
      .success{
          color:var(--themeColor)
      }
    }
  }
  .shopList{
    height: 6.25rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: .3125rem;
    box-sizing: border-box;
    margin-bottom: .4688rem;
    img{
      width: 5.625rem;
      height: 5.625rem;
    }
    .right{
      flex: 1;
      padding: 0 .4688rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
        font-size: .9375rem;
        height: 4.5938rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        -webkit-box-orient: vertical;
        padding-bottom: .25rem;
        .tag{
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
            margin-right: .25rem;
        }
      }
      .price{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        span{
          &:first-child{
            font-size: 1.25rem;
            color: var(--themeColor)
          }
        }
      }
    }
  }
  .btns{
    display: flex;
    justify-content: space-between;
    margin-top: .625rem;
    .right{
      display: flex;
      justify-content: flex-end;
    }
  }
}
.empty{
  margin-top: 6.25rem;
}
}
</style>