<template>
  <div class="layout-dropdown">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon class="el-icon--right"><Setting /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="chooseLayout('normal')">normal</el-dropdown-item>
          <el-dropdown-item @click="chooseLayout('vertical')">vertical</el-dropdown-item>
          <el-dropdown-item
            divided
            @click="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts" name="layoutChange">
import { Setting } from '@element-plus/icons-vue';
import { getGlobalStore } from '@/stores/modules/global';
import { getUserStore } from '@/stores/modules/user';

const globalStore = getGlobalStore();
const useStore = getUserStore();
function chooseLayout(item: 'vertical' | 'normal' | 'transverse' | 'columns') {
  console.log(item, 'chooseLayout');
  globalStore.setGlobalLayout(item);
}
function logout() {
  useStore.userLogout();
}
</script>
<style scoped lang="scss">
.layout-dropdown {
  display: flex;
  height: 100%;
  align-items: center;
  line-height: 21px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  outline: none;
  border: none;
}
</style>
