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
  width: 100%;
}
</style>
