<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="文件上传"
      width="800"
    >
      <upload-boot
        @after-upload="afterUpload"
        :uploadApi="httpUpload"
        :accept="[
          'application/x-zip-compressed',
          'application/zip',
          'application/octet-stream',
          'image/jpeg',
          'image/png',
          'application/pdf',
        ]"
        :show-progress="true"
        :isChunk="false"
        :list-type="'picture-card'"
        class="customUpload-btn"
      ></upload-boot>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="sysDialog">
import { ref } from 'vue';
import uploadBoot from '@/components/uploadBoot/uploadBoot.vue';
import { httpUpload } from '../api';

const dialogVisible = ref(false);
const dialogProps = ref({});

function afterUpload() {
  console.log('afterUpload');
}

function acceptParams(params: any) {
  console.log(params, 'params');
  dialogVisible.value = true;
  dialogProps.value = params;
}

defineExpose({
  acceptParams,
});
</script>
<style scoped lang="scss"></style>
