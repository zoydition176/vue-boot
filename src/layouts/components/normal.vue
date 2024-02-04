<template>
  <!-- 首页默认布局 -->
  <div class="normal-layout">
    <el-container class="layout-content">
      <asideBar />
      <el-container>
        <el-header>
          <div class="z-header">
            <span>首页默认布局</span>
            <layout-change />
          </div>
        </el-header>
        <el-main>
          <tabs></tabs>
          <main-content></main-content>
        </el-main>
        <el-footer class="normal-footer">vue boot</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="normal">
import LayoutChange from "@/layouts/blocks/layoutChange.vue";
import asideBar from "./aside/index.vue";
import mainContent from "./mainContent/index.vue";
import tabs from "@/layouts/components/tabs/index.vue";

</script>
<style scoped lang="scss">
@import "@/layouts/index.scss";
</style>
