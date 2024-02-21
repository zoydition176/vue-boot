<template>
  <div class="main-content">
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" v-if="!route.meta.link" :key="route.fullPath"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts" name="mainContent">

</script>
<style scoped lang="scss">
.main-content{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
}
</style>
