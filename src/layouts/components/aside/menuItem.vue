<template>
  <el-sub-menu
    v-if="menuData.children"
    :index="menuData.path"
  >
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ menuData.meta.title }}</span>
    </template>
    <menuItem
      v-for="item in menuData.children"
      :menu-data="item"
      :key="item.path"
    ></menuItem>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="menuData.path"
    @click="handleMenu(menuData.path)"
  >
    <el-icon><icon-menu /></el-icon>
    <span>{{ menuData.meta.title }}</span>
  </el-menu-item>
</template>
<script setup lang="ts">
import { menuTypes } from '@/typing/base';
import { Location, Menu as IconMenu } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
defineProps<{
  menuData: menuTypes;
}>();
const router = useRouter();
const handleMenu = (path: string) => {
  router.push(path);
};
</script>
<style scoped lang="scss"></style>
