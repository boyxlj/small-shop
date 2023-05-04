<template>
    <router-view v-slot="{ Component }">
      <transition name="app">
            <keep-alive>
              <component
                :is="Component"
                v-if="$route.meta.keepAlive"
                :key="$route.path"
              ></component>
            </keep-alive>
          </transition>
  <transition name="app">
    <component
      :is="Component"
      v-if="!$route.meta.keepAlive"
      :key="$route.path"
    ></component>
  </transition>
  </router-view>

</template>

<script setup lang="ts">

</script>

<style scoped>
.app-enter-from,.app-leave-to{
  opacity: 0;
}
.app-enter-to,.app-leave-from{
  opacity: 1;
  transition: all .3s;
}
</style>
