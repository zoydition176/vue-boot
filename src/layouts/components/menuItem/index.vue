<template>
  <template v-for="item in menuData" :key="item.name">
    <el-menu-item>

    </el-menu-item>
  </template>
</template>
<script setup lang="ts" name="menuItem">
defineProps({
  menuData: {
    type: Array,
    default: () => []
  },
})
</script>
<style scoped lang="scss">

</style>
