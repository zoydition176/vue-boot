<template>
  <!-- 首页默认布局 -->
  <div class="normal-layout">
    <el-container class="layout-content">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>Navigator Four</span>
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
      </el-aside>
      <el-container>
        <el-header>
          <div class="z-header">
            <span>首页默认布局</span>
            <layout-change />
          </div>
        </el-header>
        <el-main>
          <main-content></main-content>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="normal">
import LayoutChange from "@/layouts/blocks/layoutChange.vue";
import { useRouter } from "vue-router";
import mainContent from "./mainContent/index.vue";

const router = useRouter();
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
@import "@/layouts/index.scss";
</style>
