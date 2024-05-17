<template>
  <div class="login-page bg">
    <loginForm></loginForm>
  </div>
</template>
<script setup lang="ts" name="login">
import loginForm from './loginForm.vue';
</script>
<style scoped lang="scss">
.login-page {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
// 生成一个蓝色渐变样式
.bg {
  background: linear-gradient(90deg, #3f8cfb 0%, #3fbbfd 100%);
}
</style>
