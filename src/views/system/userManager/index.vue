<template>
  <div class="userManager">
    <el-row>
      <el-button type="primary">新增</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="nickname" label="真名" width="180" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer v-model="editDrawer" title="编辑" :destroy-on-close="true">
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>
<script setup lang="ts" name="userManager">
import { ref, onMounted } from "vue";
import {getUserList} from "../api";
const tableData = ref([]);
const editDrawer = ref(false);
function test() {
  getUserList({
    pageNum: 1,
    pageSize: 10
  }).then((res)=>{
    tableData.value = res.records;
  });
}

function handleUpdate(row: any){
  console.log(row, 'handleUpdate');
  editDrawer.value = true;
}

function handleDelete(row: any){
  console.log(row, 'handleDelete');
}
onMounted(()=>{
  test();
})
</script>
<style scoped lang="scss">

</style>
