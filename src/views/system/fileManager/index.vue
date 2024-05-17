<template>
  <div class="fileManager">
    <el-row>
      <el-button
        type="primary"
        @click="BatchDelete"
        >批量删除</el-button
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
        @selection-change="handleSelect"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="id"
        />
        <el-table-column
          prop="name"
          label="文件名"
        />
        <el-table-column
          prop="type"
          label="文件类型"
        />
        <el-table-column
          prop="size"
          label="文件大小"
        />
        <el-table-column
          prop="isDelete"
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable"
              @change="handleEnable(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              @click="handleDownload(scope.row)"
              >文件下载</el-button
            >
            <el-button
              type="primary"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <sysDialog ref="sysDialogDom"></sysDialog>
    </div>
  </div>
</template>
<script setup lang="ts" name="fileManager">
import sysDialog from '../components/sysDialog.vue';
import { onMounted, ref } from 'vue';
import { getFileList, httpFileBatchDel, httpFileDel, httpFileUpdate } from '@/views/system/api';
const tableData = ref([]);
const sysDialogDom = ref();
const multipleSelection = ref([]);
function commonFileUpload() {
  sysDialogDom.value.acceptParams({});
}
function handleSelect(val) {
  multipleSelection.value = val;
  console.log(multipleSelection.value, 'multipleSelection.value');
}
function getList() {
  getFileList({
    pageNum: 1,
    pageSize: 10,
  }).then((res) => {
    tableData.value = res.records;
  });
}
function handleEnable(row) {
  console.log(row, 'handleEnable');
  httpFileUpdate(row).then((res) => {
    console.log(res, 'handleEnable');
  });
}
function handleDelete(row) {
  httpFileDel(row.id).then((res) => {
    console.log(res, 'handleDelete');
    getList();
  });
}
function BatchDelete() {
  const ids = multipleSelection.value.map((item) => {
    return item.id;
  });
  httpFileBatchDel(ids).then((res) => {
    console.log(res, 'hppp');
    getList();
  });
}
function handleDownload(row) {
  window.open(row.url);
}
onMounted(() => {
  getList();
});
</script>
<style scoped lang="scss">
.fileManager {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
