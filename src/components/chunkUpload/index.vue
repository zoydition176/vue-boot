<template>
  <div>
    <h3>大文件上传</h3>
    <a-upload-dragger
      name="file"
      :multiple="true"
      action="#"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>
  </div>
</template>
<script lang="ts" setup name="chunkUpload">
// import { ref, reactive } from 'vue';
// import httpRequest from '../../api/index';
import { InboxOutlined } from '@ant-design/icons-vue';
// import SparkMD5 from "spark-md5";


</script>
<style scoped lang="scss">

</style>
