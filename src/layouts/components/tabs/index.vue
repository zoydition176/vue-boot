<template>
  <div class="tabs">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" type="card" @tab-remove="tabRemove">
      <el-tab-pane v-for="(object, index) in tabsList" :name="object.name" :label="object.title" :key="index" :closable="!object.isAffix">
        <template #label>
          {{ object.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts" name="tabs">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTabStore } from "@/stores/modules/tabs";
import { routeTabs } from "@/typing/base";
import { TabsPaneContext, TabPaneName } from "element-plus";

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const tabsList = computed(() => tabStore.tabsList);
const activeName = ref()
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  if(tab.paneName !== route.name){
    router.push({
      name: tab.paneName as string
    });
  }
}
const tabRemove = (name: TabPaneName) => {
  console.log(name, 'tabRemove');
  tabStore.removeTabs(name);
}
watch(() => route.fullPath, () => {
  activeName.value = route.name;
  const routeDetail: routeTabs = {
    name: route.name as string,
    fullPath: route.fullPath as string,
    title: route.meta.title as string,
    isHidden: route.meta.isHidden as boolean,
    isKeepAlive: route.meta.isKeepAlive as boolean,
    isActive: route.meta.isActive as boolean,
    isAffix: route.meta.isAffix as boolean
  }
  tabStore.addTabs(routeDetail);
  console.log(route, router, tabStore.tabsList, 'route router');
},{ immediate: true });
</script>
<style scoped lang="scss">

</style>
