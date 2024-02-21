<template>
  <div class="vertical-layout">
    <el-container class="layout-content">
      <el-header class="z-header">
        <layout-change />
        <tabs></tabs>
      </el-header>
      <el-container>
        <asideBar />
        <el-container>
          <el-main class="main">
            <main-content></main-content>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="vertical">
import asideBar from "./aside/index.vue";
import LayoutChange from "@/layouts/blocks/layoutChange.vue";
import mainContent from "./mainContent/index.vue";
import tabs from "@/layouts/components/tabs/index.vue";
</script>
<style scoped lang="scss">
@import "@/layouts/index.scss";
</style>
