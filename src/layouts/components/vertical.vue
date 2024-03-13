<template>
  <div class="vertical-layout">
    <el-container class="layout-content">
      <el-header>
        <headerContent />
      </el-header>
      <el-container>
        <asideBar />
        <el-container>
          <el-main class="main">
            <main-content></main-content>
          </el-main>
          <el-footer>
            <footerContent />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="vertical">
import asideBar from "./aside/index.vue";
import mainContent from "./mainContent/index.vue";
import headerContent from "./header/header.vue";
import footerContent from "./footer/footer.vue";
</script>
<style scoped lang="scss">
@import "@/layouts/index.scss";
</style>
