<template>
  <div class="layout-dropdown">
    <el-dropdown>
      <span class="el-dropdown-link">
        布局修改
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="chooseLayout('normal')">normal</el-dropdown-item>
          <el-dropdown-item @click="chooseLayout('vertical')">vertical</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts" name="layoutChange">
import { ArrowDown } from '@element-plus/icons-vue';
import { getGlobalStore } from "@/stores/modules/global";

const globalStore = getGlobalStore();
function chooseLayout(item){
  console.log(item, 'chooseLayout');
  globalStore.setGlobalLayout(item);
}
</script>
<style scoped lang="scss">

</style>
