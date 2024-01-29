<template>
  <div class="tabs">
    <div v-for="(item, index) in tabStore.tabsList" :key="index">
      {{ item.fullPath }}
    </div>
  </div>
</template>
<script setup lang="ts" name="tabs">
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTabStore } from "@/stores/modules/tabs";

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
watch(() => route.fullPath, () => {
  console.log(route, router, 'route router');
  tabStore.addTabs(route);
});
</script>
<style scoped lang="scss">

</style>
