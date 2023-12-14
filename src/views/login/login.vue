<template>
  <div class="login-page">
    <loginForm></loginForm>
  </div>
</template>
<script setup lang="ts" name="login">
import LoginForm from "./loginForm.vue";
</script>
<style scoped>
.login-page{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
