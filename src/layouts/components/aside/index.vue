<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    text-color="#fff"
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu>123</el-sub-menu>

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
    <el-menu-item index="4" @click="handleMenu('/abc')">
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
</template>
<script setup lang="ts" name="asideBar">
import {useRouter} from "vue-router";

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

</style>
