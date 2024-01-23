<template>
  <div class="userManager">
    <el-row>
      <el-button type="primary" @click="saveUser">新增</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="nickname" label="真名" width="180" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="avatar" label="头像地址" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <sysDrawer ref="sysDrawerDom"></sysDrawer>
  </div>
</template>
<script setup lang="ts" name="userManager">
import { ref, onMounted } from "vue";
import { getUserList } from "../api";
import sysDrawer from "../components/sysDrawer.vue"
const tableData = ref([]);
const sysDrawerDom = ref();
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
}

function handleDelete(row: any){
  console.log(row, 'handleDelete');
}

function saveUser(){
  sysDrawerDom.value.acceptParams({
    isEdit: false
  });
}

onMounted(()=>{
  test();
})
</script>
<style scoped lang="scss">

</style>
