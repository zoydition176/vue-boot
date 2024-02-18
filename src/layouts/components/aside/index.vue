<template>
  <el-aside width="200px">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        default-active="2"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="4" @click="handleMenu('/table')">
        <span>表格</span>
      </el-menu-item>
      <el-sub-menu index="5">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item index="5-1" @click="handleMenu('/departmentManager')">机构管理</el-menu-item>
        <el-menu-item index="5-2" @click="handleMenu('/menuManager')">菜单管理</el-menu-item>
        <el-menu-item index="5-3" @click="handleMenu('/permissionManager')">权限管理</el-menu-item>
        <el-menu-item index="5-4" @click="handleMenu('/roleManager')">角色管理</el-menu-item>
        <el-menu-item index="5-5" @click="handleMenu('/userManager')">用户管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <menuItem :menu-data="authMenuList"></menuItem>
  </el-aside>
</template>
<script setup lang="ts" name="asideBar">
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/modules/auth";
import { computed } from "vue";
import menuItem from "@/layouts/components/menuItem/index";

const router = useRouter();
const authStore = useAuthStore();
const authMenuList = computed(() => authStore.showAsideList);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}
const handleMenu = (path: string) => {
  router.push(path);
}
</script>
<style scoped lang="scss">

</style>
