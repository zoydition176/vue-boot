<template>
  <div class="vertical-layout">
    <el-container class="layout-content">
      <el-header class="z-header">
        <span>首页垂直布局</span>
        <layout-change />
      </el-header>
      <el-container>
        <asideBar />
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="vertical">
import asideBar from "./aside/index.vue";
import LayoutChange from "@/layouts/blocks/layoutChange.vue";
</script>
<style scoped lang="scss">
@import "@/layouts/index.scss";
</style>
