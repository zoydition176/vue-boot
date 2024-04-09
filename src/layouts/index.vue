<template>
  <component :is="outLookComponents[layout]"/>
</template>
<script setup lang="ts" name="layouts">
import { computed, shallowRef } from "vue";
import { getGlobalStore } from "@/stores/modules/global";
import normal from "./components/normal.vue";
import vertical from "./components/vertical.vue";
const outLookComponents = shallowRef({
  normal: normal,
  vertical: vertical
});
const globalStore = getGlobalStore();
const layout = computed(() => globalStore.layout);
</script>
<style scoped lang="scss">

</style>
