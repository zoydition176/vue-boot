<template>
  <div class="fileManager">
    <el-row>
      <el-button type="primary" @click="BatchDelete">批量删除</el-button>
      <el-button type="primary" @click="commonFileUpload">上传文件</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column prop="name" label="文件名" width="180" />
      <el-table-column prop="type" label="文件类型" width="180" />
      <el-table-column prop="size" label="文件大小" />
      <el-table-column label="下载" width="200" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="handleDownload(scope.row)">文件下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <sysDialog ref="sysDialogDom"></sysDialog>
  </div>
</template>
<script setup lang="ts" name="fileManager">
import sysDialog from "../components/sysDialog.vue";
import { onMounted, ref } from "vue";
import { getFileList, httpFileDownload } from "@/views/system/api";
import {fileDownload} from "@/utils";

const tableData = ref([]);
const sysDialogDom = ref();
function commonFileUpload(){
  sysDialogDom.value.acceptParams({});
}
function getList() {
  getFileList({
    pageNum: 1,
    pageSize: 10
  }).then((res)=>{
    tableData.value = res.records;
  });
}
function BatchDelete(){

}
function handleDownload(row){
  console.log(row, 'handleDl');
  httpFileDownload(row.url).then((res)=>{
    fileDownload(res, row.name);
  })
}
onMounted(()=>{
  getList();
});
</script>
<style scoped lang="scss">

</style>
