<template>
  <div class="not-container">
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
      <button @click="router.back"> 返回上一页 </button>
    </div>
  </div>
</template>

<script setup lang="ts" name="403">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
