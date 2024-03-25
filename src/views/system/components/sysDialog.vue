<template>
  <div>
    <el-dialog v-model="dialogVisible" title="Shipping address" width="800">
      <el-upload
        class="upload-demo"
        ref="uploadRef"
        drag
        action="#"
        :http-request="handleUploadFile"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <template #footer>
        <el-button @click="submitUpload">上传</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="sysDialog">
import {ref} from "vue";
import { UploadFilled } from '@element-plus/icons-vue';
import type { UploadInstance } from 'element-plus'
// import {importUserList} from "@/views/system/api";

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit();
}
const dialogVisible = ref(false);
const dialogProps = ref({});

function handleUploadFile(file){
  // importUserList();
}
function acceptParams(params: any){
  console.log(params, 'params');
  dialogVisible.value = true;
  dialogProps.value = params;
}
defineExpose({
  acceptParams
})
</script>
<style scoped lang="scss">

</style>
