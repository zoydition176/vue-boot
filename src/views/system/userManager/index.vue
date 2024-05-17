<template>
  <div class="userManager">
    <el-row>
      <el-button
        type="primary"
        @click="saveUser(0, {})"
        >新增</el-button
      >
      <el-button
        type="primary"
        @click="handleExport()"
        >导出</el-button
      >
      <el-button
        type="primary"
        @click="commonFileUpload"
        >上传文件</el-button
      >
    </el-row>
    <div class="table-slot">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
      >
        <el-table-column
          prop="id"
          label="id"
          width="80"
        />
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        />
        <el-table-column
          prop="nickname"
          label="真名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="email"
          label="邮箱"
        />
        <el-table-column
          prop="phone"
          label="电话"
        />
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              @click="saveUser(1, scope.row)"
              >修改</el-button
            >
            <el-button
              type="primary"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--element自带的分页真的很垃圾-->
      <!--<el-pagination layout="prev, pager, next" :total="listTotal" />-->
      <sysDrawer ref="sysDrawerDom"></sysDrawer>
      <sysDialog ref="sysDialogDom"></sysDialog>
    </div>
  </div>
</template>
<script setup lang="ts" name="userManager">
import { ref, onMounted } from 'vue'
import { deleteUser, getUserList, updateUserList, exportUserList } from '../api'
import sysDrawer from '../components/sysDrawer.vue'
import sysDialog from '../components/sysDialog.vue'
import { fileDownload } from '@/utils'

const tableData = ref([])
const sysDrawerDom = ref()
const sysDialogDom = ref()
const listTotal = ref(0)
function getList() {
  getUserList({
    pageNum: 1,
    pageSize: 10,
  }).then((res) => {
    console.log(res, 'res')
    tableData.value = res.records
    listTotal.value = res.total
  })
}

function handleDelete(row: any) {
  console.log(row, 'handleDelete')
  deleteUser(row.id).then(() => {
    getList()
  })
}

function saveUser(type: number, row: any) {
  sysDrawerDom.value.acceptParams({
    isView: false,
    title: type ? '编辑' : '新增',
    row: { ...row },
    api: updateUserList,
  })
}

function handleExport() {
  console.log('导出')
  exportUserList().then((res) => {
    fileDownload(res, '用户列表')
  })
}

function commonFileUpload() {
  sysDialogDom.value.acceptParams({})
}

onMounted(() => {
  getList()
})
</script>
<style scoped lang="scss">
.userManager {
  display: flex;
  height: 100%;
  flex-direction: column;
  min-height: 0;
}
</style>
