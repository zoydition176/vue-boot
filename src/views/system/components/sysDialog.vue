<template>
  <div>
    <el-dialog v-model="dialogVisible" title="Shipping address" width="800">
      <upload-boot
        @after-upload="afterUpload"
        :uploadApi="httpUpload"
        :accept="['application/x-zip-compressed','application/zip','application/octet-stream']"
        :show-progress="true"
        :isChunk="false"
        class="customUpload-btn"
      ></upload-boot>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="sysDialog">
import { ref } from "vue";
import uploadBoot from "@/components/uploadBoot/uploadBoot.vue"
import { httpUpload } from "../api"

const dialogVisible = ref(false);
const dialogProps = ref({});

function afterUpload(){
  console.log("afterUpload");
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
