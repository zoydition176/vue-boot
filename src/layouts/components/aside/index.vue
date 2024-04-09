<template>
  <el-aside class="boot-aside" width="200px">
    <Logo></Logo>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :default-active="defaultActive"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <menuItem v-for="item in authMenuList" :menu-data="item" :key="item.path"></menuItem>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts" name="asideBar">
import {useAuthStore} from "@/stores/modules/auth";
import { computed } from "vue";
import menuItem from "./menuItem.vue";
import Logo from "./logo.vue";
import {useRoute} from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const authMenuList = computed(() => authStore.showAsideList);
const defaultActive = computed(() => route.fullPath);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleOpen');
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleClose');
}
</script>
<style scoped lang="scss">
.boot-aside{
  background: #545c64;
  //border-right: solid 1px var(--el-menu-border-color);
}
:deep(.el-menu){
  border-right: none;
}
</style>
