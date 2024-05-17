<template>
  <div class="tabs">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="(object, index) in tabsList"
        :name="object.name"
        :label="object.title"
        :key="index"
        :closable="!object.isAffix"
      >
        <template #label>
          {{ object.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts" name="tabs">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTabStore } from '@/stores/modules/tabs';
import { routeTabs } from '@/typing/base';
import { TabsPaneContext, TabPaneName } from 'element-plus';

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const tabsList = computed(() => tabStore.tabsList);
const activeName = ref();
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  if (tab.paneName !== route.name) {
    router.push({
      name: tab.paneName as string,
    });
  }
};
const tabRemove = (name: TabPaneName) => {
  tabStore.removeTabs(name);
};
watch(
  () => route.fullPath,
  () => {
    activeName.value = route.name;
    const routeDetail: routeTabs = {
      name: route.name as string,
      fullPath: route.fullPath as string,
      title: route.meta.title as string,
      isHidden: route.meta.isHidden as boolean,
      isKeepAlive: route.meta.isKeepAlive as boolean,
      isActive: route.meta.isActive as boolean,
      isAffix: route.meta.isAffix as boolean,
    };
    tabStore.addTabs(routeDetail);
  },
  { immediate: true }
);
</script>
<style scoped lang="scss">
:deep(.el-tabs__nav-scroll) {
  padding: 0 20px;
}
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
.tabs {
  :deep(.el-tabs__item) {
    .is-icon-close {
      position: relative;
      font-size: 12px;
      width: 0;
      height: 14px;
      overflow: hidden;
      right: -2px;
      color: var(--el-color-primary);
      transform-origin: 100% 50%;
      &:hover {
        color: #ffffff;
      }
    }
  }
  :deep(.el-tabs__item.is-active .is-icon-close) {
    width: 14px;
  }
  :deep(.el-tabs__item) {
    color: inherit;
    //&:hover{
    //  .is-icon-close{
    //    width: 14px;
    //  }
    //}
    &.is-active {
      color: var(--el-color-primary);
    }
  }
  :deep(.el-tabs__item) {
    transition:
      color var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier),
      padding var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  }
}
</style>
