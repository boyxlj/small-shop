<template>
  <div class="header">
    {{ titleMsg }}
  </div>
</template>

<script setup lang="ts">
import {emitter} from "@/utils/mitt";
const titleMsg = ref("首页");
type Props = {
  titleMsg?:string
}
const props = withDefaults(defineProps<Props>(),{
  titleMsg:""
})
if(props.titleMsg){
  titleMsg.value  =props.titleMsg
}
emitter.on("updateTitle",(msg:string)=>{
  titleMsg.value  = msg
});
</script>

<style lang="less" scoped>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2.66rem;
    width: 100%;
    z-index: 999;
    border-bottom: .125rem solid #eee;
    display:flex;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    font-size: 1.025rem;
  }
  

</style>
