<template>
  <div class="boot-logo">
    <img
      class="logo-img"
      src="@/assets/logo/dx.svg"
      alt="logo"
    />
    <span class="app-title">{{ appTitle }}</span>
  </div>
</template>
<script setup lang="ts">
const appTitle = import.meta.env.VITE_GLOB_APP_TITLE;
</script>
<style scoped lang="scss">
.boot-logo {
  display: flex;
  padding: 8px 20px;
  align-items: center;
  .logo-img {
    width: 30px;
    height: auto;
    margin-right: 6px;
  }
  .app-title {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
