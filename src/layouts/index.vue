<template>
  <component :is=""/>
</template>
<script setup lang="ts" name="layouts">
import { reactive, computed } from "vue";

const outLookCompontents = reactive({
  normal: null,
  vertical: null
});

const layout = computed(() => globalStore.layout);
</script>
<style scoped lang="scss">

</style>
