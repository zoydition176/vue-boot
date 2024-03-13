<template>
	<div>
    <div class="z-header">
      <span class="user-info">hello! {{ userInfo.nickname }}</span>
      <layout-change />
    </div>
  </div>
</template>
<script setup lang="ts" name="headerContent">
import LayoutChange from "@/layouts/blocks/layoutChange.vue";
import { getUserStore } from "@/stores/modules/user";
import { computed } from "vue";

const userStore = getUserStore();
const userInfo = computed(() => userStore.userInfo);
// console.log(userInfo, 'userInfo');
</script>
<style lang="scss" scoped>
.z-header{
  display: flex;
  height: 32px;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  .user-info{
    font-size: 14px;
  }
}
</style>
