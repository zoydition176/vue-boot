<template>
  <div class="uploadBoot">
    <el-upload
      ref="chunkUploadDom"
      :http-request="fileUpload"
      :before-upload="bfChunkUpload"
      :drag="isDrag"
      accept=".zip"
      :disabled="disabled || uploadStatus.isUploading"
      :list-type="listType"
    >
      <template #default>
        <div v-if="listType === 'picture-card'">
          <el-icon><Upload /></el-icon>
        </div>
        <div v-else>
          <div v-if="isDrag">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              点击重新上传压缩包
            </div>
          </div>
          <div v-else>
            <el-button type="primary" :disabled="disabled || uploadStatus.isUploading" :loading="uploadStatus.isProcessing">
              {{ btnMessage }}
            </el-button>
          </div>
        </div>
      </template>
      <template #file="{ file }">
        <div class="custom-file-block" v-if="listType === 'picture-card'">
          <img :src="filesIcon" alt="" />
          <p>{{ checkFileType(file) }}</p>
        </div>
      </template>
    </el-upload>
    <div>
      <el-progress v-if="showProgress" v-show="uploadStatus.isUploading" :percentage="uploadStatus.uploadPercent" />
    </div>
  </div>
</template>
<script setup lang="ts" name="uploadBoot">
import {computed, onMounted, reactive, ref} from "vue";
import SparkMD5 from 'spark-md5';
import { Upload, UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import filesIcon from '@/assets/appIcons/shellscript.png';
import { checkFile } from "@/utils";

const props = defineProps({
  // 普通上传
  uploadApi: {
    type: Function,
    default: ()=> Promise.resolve()
  },
  // 分片上传
  uploadChunk: {
    type: Function,
    default: ()=> Promise.resolve()
  },
  // 分片上传-合并
  uploadMerge: {
    type: Function,
    default: ()=> Promise.resolve()
  },
  // 禁用属性
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示进度条
  showProgress: {
    type: Boolean,
    default: true
  },
  // 上传组件类型
  listType: {
    type: String,
    default: 'text'
  },
  // 上传文件类型列表
  accept: {
    type: Array,
    default: () => []
  },
  // 是否可拖拽
  isDrag: {
    type: Boolean,
    default: false
  },
  // 是否分片上传
  isChunk: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['afterUpload']);
const chunkUploadDom = ref();
const fileName = ref('');
const fileHash = ref('');
const chunkSize = ref(1024 * 1024 * 3);
const suffix = ref('');
const chunkNum = ref(1);
const taskPool = ref<Promise<any>[]>([]);
const maxPoolsSize = ref(3);
const uploadStatus = reactive({
  alreadyList: [] as string[],
  successNum: 0,
  uploadPercent: 0,
  isUploading: false,
  isProcessing: false,
  timeStamp: ''
});
const btnMessage = computed(()=>{
  return uploadStatus.isProcessing ? '文件解析中，请等待' : '上传压缩包'
});

const bfChunkUpload = (file: any) => {
  // 最大4G
  return checkFile({ size: file.size, type: file.type }, { size: 2048, accept: props.accept }, "上传文件的格式必须为.zip类型。");
}

const fileChunkUpload = async (file: any) => {
  // 文件解析状态
  uploadStatus.isProcessing = true;
  // 分片上传状态
  uploadStatus.isUploading = true;
  fileHash.value = await getFileHash(file.file);
  chunkNum.value = Math.ceil(file.file.size/chunkSize.value);
  suffix.value = /\.([\w]+)$/.exec(file.file.name)![1];
  fileName.value = file.file.name;
  uploadStatus.timeStamp = new Date().getTime() + '';
  const isAlready = false;
  if(isAlready){
    console.log('文件已经存在');
  }else{
    const chunksList = createChunks(file.file);
    // 文件解析状态结束
    uploadStatus.isProcessing = false;
    await uploadChunks(chunksList, file);
  }
}
const createChunks = (file: File) => {
  const chunks = Array.from({ length: chunkNum.value }, (_: unknown, index: number) => {
    return {
      file: file.slice(index * chunkSize.value, (index + 1) * chunkSize.value),
      filename: `${fileHash.value}${uploadStatus.timeStamp}_${index + 1}.${suffix.value}`
    }
  });
  return chunks;
}
const getFileHash = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if(!file){
      reject();
    }
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = ev => {
      let buffer = ev.target?.result;
      const hash = new SparkMD5.ArrayBuffer().append(buffer! as ArrayBuffer).end();
      resolve(hash);
    }
  })
}
const chunkUploadComplete = async (totalFile) => {
  uploadStatus.successNum++;
  uploadStatus.uploadPercent = Math.round((uploadStatus.successNum / chunkNum.value) * 100);
  if (uploadStatus.successNum < chunkNum.value) return;
  // 全部切片上传完成
  uploadStatus.uploadPercent = 100;
  try {
    // 执行合并api
    const res = await props.uploadMerge({
      fileName: fileName.value,
      md5: fileHash.value + '' + uploadStatus.timeStamp,
      total: chunkNum.value
    });
    console.log(res, 'await uploadMerge');
    if(res.success){
      // 文件上传状态结束
      uploadStatus.isUploading = false;
      emits('afterUpload', res);
    }
  } catch (e) {
    ElMessage.error("文件上传失败，请重新上传!");
    chunkUploadDom.value.handleRemove(totalFile);
  } finally {
    reset();
  }
}
const uploadChunks = async (chunks: any[], totalFile: any) => {
  for (let index = 0; index < chunks.length; index++) {
    const chunkItem = chunks[index];
    // console.log(chunkItem, 'chunkItem');
    // let test = await getBase64(chunkItem.file);
    // console.log(test, 'testtesttest');
    // filePreviewDownload(chunkItem.file);
    // 已经上传过的
    if (uploadStatus.alreadyList.length > 0 && uploadStatus.alreadyList.includes(chunkItem.filename)) {
      await chunkUploadComplete(totalFile);
      continue;
    }
    const formData = new FormData();
    formData.append('current', index + '');
    formData.append('md5', fileHash.value + '' + uploadStatus.timeStamp);
    formData.append('fileName', chunkItem.filename);
    formData.append('total', chunkNum.value + '');
    formData.append('file', chunkItem.file);
    // formData.append('fileSize', chunkItem.file.size);
    const task = props.uploadChunk(formData);
    taskPool.value.push(task);
    task.then(res => {
      // console.log(res, 'task res');
      // isUp.value++;
      // console.log(isUp.value, 'isUp.value');
      if (res) {
        chunkUploadComplete(totalFile);
      }
      // if(isUp.value === chunkNum.value){
      //   chunkUploadComplete();
      // }
      // 执行完成,从池中移除
      const item = taskPool.value.findIndex(x => x === task);
      taskPool.value.splice(item);
    }).catch(() => {
      // console.log('单个切片上传失败');
      ElMessage.error("文件上传中断，请重新上传!");
      chunkUploadDom.value.handleRemove(totalFile);
      return Promise.reject();
    });

    if (taskPool.value.length >= maxPoolsSize.value) {
      // 等待并发池执行完一个任务后
      await Promise.race(taskPool.value)
    }
  }
}
const reset = () => {
  Object.assign(uploadStatus, {
    alreadyList: [] as string[],
    successNum: 0,
    uploadPercent: 0,
    isUploading: false,
    isProcessing: false,
    timeStamp: ''
  })
};

function checkFileType(file){
  const fileType = file.name.split('.');
  return file.name + '' + fileType[fileType.length - 1];
}

function fileGeneralUpload(file){
  const formData = new FormData();
  formData.append('file', file.file);
  console.log(formData.get('file'), 'formData');
  props.uploadApi(formData).then((res: any)=>{
    console.log(res, 'uploadApi');
    emits('afterUpload', res);
  });
}

function fileUpload(file){
  if(props.isChunk){
    return fileChunkUpload(file);
  }else{
    return fileGeneralUpload(file);
  }
}

/*function filePreviewDownload(file: any){
  const visDom = document.createElement('a');
  visDom.download = '下载文件_' + file.name + '.txt';
  visDom.href = file.url;
  visDom.target = "_blank";
  visDom.style.display = "none";
  document.body.appendChild(visDom);
  visDom.click();
  document.body.removeChild(visDom);
}*/

/*function getBase64(data) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([data], { type: "image/jpg" }); // 必须指定type类型
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}*/
onMounted(()=>{})
</script>
<style scoped lang="scss">

</style>
