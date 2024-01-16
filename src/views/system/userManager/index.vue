<template>
  <div class="userManager">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="nickname" label="真名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </div>
</template>
<script setup lang="ts" name="userManager">
import { ref, onMounted } from "vue";
import { getUserList } from "../api";
const tableData = ref([]);
function test() {
  getUserList({
    pageNum: 1,
    pageSize: 10
  }).then((res)=>{
    tableData.value = res.records;
  });
}
onMounted(()=>{
  test();
})
</script>
<style scoped lang="scss">

</style>
