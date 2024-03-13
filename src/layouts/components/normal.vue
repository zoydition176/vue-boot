<template>
  <!-- 首页默认布局 -->
  <div class="normal-layout">
    <el-container class="layout-content">
      <asideBar />
      <el-container>
        <el-header>
          <headerContent />
        </el-header>
        <el-main class="main">
          <main-content />
        </el-main>
        <el-footer>
          <footerContent />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="normal">
import asideBar from "./aside/index.vue";
import mainContent from "./mainContent/index.vue";
import headerContent from "./header/header.vue";
import footerContent from "./footer/footer.vue";
</script>
<style lang="scss" scoped>
@import "@/layouts/index.scss";
</style>
