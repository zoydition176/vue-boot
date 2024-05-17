<template>
  <div>
    <div class="z-header">
      <span class="user-info">hello! {{ userInfo.nickname }}</span>
      <span class="user-avatar">
        <img :src="userInfo.avatar" />
      </span>
      <layout-change />
    </div>
  </div>
</template>
<script setup lang="ts" name="headerContent">
import LayoutChange from './layoutChange.vue';
import { getUserStore } from '@/stores/modules/user';
import { computed } from 'vue';

const userStore = getUserStore();
const userInfo = computed(() => userStore.userInfo);
// console.log(userInfo, 'userInfo');
</script>
<style lang="scss" scoped>
.z-header {
  display: flex;
  height: 40px;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  .user-info {
    font-size: 14px;
  }
  .user-avatar {
    display: flex;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #f0f0f0;
      margin-left: 10px;
    }
  }
}
</style>
