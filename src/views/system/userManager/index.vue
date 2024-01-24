<template>
  <div class="userManager">
    <el-row>
      <el-button type="primary" @click="saveUser(0, {})">新增</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="nickname" label="真名" width="180" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="avatarUrl" label="头像地址" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="saveUser(1, scope.row)">修改</el-button>
          <el-button type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--element自带的分页真的很垃圾-->
    <el-pagination layout="prev, pager, next" :total="listTotal" />
    <sysDrawer ref="sysDrawerDom"></sysDrawer>
  </div>
</template>
<script setup lang="ts" name="userManager">
import { ref, onMounted } from "vue";
import {deleteUser, getUserList, updateUserList} from "../api";
import sysDrawer from "../components/sysDrawer.vue"
const tableData = ref([]);
const sysDrawerDom = ref();
const listTotal = ref(0);
function getList() {
  getUserList({
    pageNum: 1,
    pageSize: 10
  }).then((res)=>{
    tableData.value = res.records;
    listTotal.value = res.total;
  });
}

function handleDelete(row: any){
  console.log(row, 'handleDelete');
  deleteUser(row.id).then(()=>{
    getList();
  });
}

function saveUser(type: number, row: any){
  sysDrawerDom.value.acceptParams({
    isView: false,
    title: type ? "编辑" : "新增",
    row: { ...row },
    api: updateUserList
  });
}

onMounted(()=>{
  getList();
});
</script>
<style scoped lang="scss">

</style>
