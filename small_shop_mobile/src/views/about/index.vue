<template>
  <div class="aboutBox">
    <Navheader>
      <template #center>
        <div>关于微商城</div>
      </template>
    </Navheader>
    <MarkDown/>
    <div class="info">
      <div class="about">关于微商城</div>
      <div>By-xlj</div>
      <div>该商品信息均来源华为商城</div>
      <div>Copyright © 2021-2022 微商城</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkDown from "./components/markDown/index.vue"

</script>

<style lang="less" scoped>
.aboutBox {
  height: 100%;
  min-height: 100vh;
  background: var(--bgColor);
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 0.625rem;
  padding: 0 0.5625rem;
  margin-top: .625rem;
  overflow: hidden;
  
  .info{
    width: 100%;
    height: 10.125rem;
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 100rpx;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 1rem;
    background-image: linear-gradient(to right bottom,
    red,
    rgb(24, 120, 247),
    rgb(108, 11, 235),
    rgb(243, 22, 232),
    rgb(16, 252, 134),
    );
    color: transparent;
    -webkit-background-clip: text;
    div{
      margin: .25rem 0;
    }
    .about{
      font-size: 1.125rem;
      font-weight: bold;
      margin-bottom: .625rem;
    }
  }
}
</style>
