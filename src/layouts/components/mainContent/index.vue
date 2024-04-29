<template>
  <div class="main-content">
    <tabs></tabs>
    <div class="core-box">
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" v-if="!route.meta.link" :key="route.fullPath"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts" name="mainContent">
import tabs from "@/layouts/components/tabs/index.vue";
</script>
<style scoped lang="scss">
.main-content{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
}
.core-box{
  padding-top: 10px;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
}
</style>
