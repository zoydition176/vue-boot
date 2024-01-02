<template>
  <div>
    <div>home view</div>
    <div>{{ test.value }}</div>
    <chunkUpload></chunkUpload>
  </div>
</template>
<script setup lang="ts" name="home">
import chunkUpload from "@/components/chunkUpload/index.vue"
import { ref } from "vue";
const test = ref();
console.log(test);
</script>
<style scoped>

</style>
