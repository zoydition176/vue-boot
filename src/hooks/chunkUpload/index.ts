import SparkMD5 from 'spark-md5';
import { ElMessage } from 'element-plus';

interface largeFileOptions {
  fileName: string;
  file: any;
  uploadChunk(params: Record<string, any>): Promise<any>;
  uploadMerge(params: Record<string, any>): Promise<any>;
}
export class largeFileUpload {
  private options: largeFileOptions;
  public uploadStatus = {
    alreadyList: [] as string[],
    successNum: 0,
    uploadPercent: 0,
    isUploading: false,
    isProcessing: false,
  };
  //private chunkUploadDom = null;
  public fileName = '';
  public fileHash = '';
  private chunkSize = 1024 * 1024 * 5;
  private suffix = '';
  private chunkNum = 1;
  private taskPool = [] as Promise<any>[];
  private maxPoolsSize = 3;
  constructor(options: largeFileOptions) {
    this.options = options;
  }

  async fileChunkUpload(file: any) {
    // 文件解析状态
    this.uploadStatus.isProcessing = true;
    // 分片上传状态
    this.uploadStatus.isUploading = true;
    this.fileHash = await this.getFileHash(file.file);
    this.chunkNum = Math.ceil(file.file.size / this.chunkSize);
    this.suffix = /\.([\w]+)$/.exec(file.file.name)![1];
    this.fileName = file.file.name;
    const isAlready = false;
    if (isAlready) {
      console.log('文件已经存在');
    } else {
      const chunksList = this.createChunks(file.file);
      // 文件解析状态结束
      this.uploadStatus.isProcessing = false;
      await this.uploadChunks(chunksList, file);
    }
  }

  createChunks(file: File) {
    const chunks = Array.from({ length: this.chunkNum }, (_: unknown, index: number) => {
      return {
        file: file.slice(index * this.chunkSize, (index + 1) * this.chunkSize),
        filename: `${this.fileHash}_${index + 1}.${this.suffix}`,
      };
    });
    return chunks;
  }

  getFileHash(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject();
      }
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (ev) => {
        const buffer = ev.target?.result;
        const hash = new SparkMD5.ArrayBuffer().append(buffer! as ArrayBuffer).end();
        resolve(hash);
      };
    });
  }

  async chunkUploadComplete(totalFile) {
    this.uploadStatus.successNum++;
    // console.log(uploadStatus.successNum);
    this.uploadStatus.uploadPercent = Math.round((this.uploadStatus.successNum / this.chunkNum) * 100);
    if (this.uploadStatus.successNum < this.chunkNum) return;
    // 全部切片上传完成
    this.uploadStatus.uploadPercent = 100;
    try {
      // 执行合并api
      const res = await this.options.uploadMerge({
        fileName: this.fileName,
        md5: this.fileHash,
        total: this.chunkNum,
      });
      // console.log(res, 'await uploadMerge');
      if (res.success) {
        // 文件上传状态结束
        this.uploadStatus.isUploading = false;
        return res;
        // emits('afterChunkUpload', res);
      }
    } catch (e) {
      // console.log('文件合并失败');
      ElMessage.error('文件上传失败，请重新上传!');
      console.log(totalFile, 'totalFile');
      // chunkUploadDom.value.handleRemove(totalFile);
    } finally {
      this.reset();
    }
  }

  async uploadChunks(chunks: any[], totalFile: any) {
    for (let index = 0; index < chunks.length; index++) {
      const chunkItem = chunks[index];
      // 已经上传过的
      if (this.uploadStatus.alreadyList.length > 0 && this.uploadStatus.alreadyList.includes(chunkItem.filename)) {
        await this.chunkUploadComplete(totalFile);
        continue;
      }
      const formData = new FormData();
      formData.append('current', index + '');
      formData.append('md5', this.fileHash);
      formData.append('fileName', chunkItem.filename);
      formData.append('total', this.chunkNum + '');
      formData.append('file', chunkItem.file);
      // formData.append('fileSize', chunkItem.file.size);
      const task = this.options.uploadChunk(formData);
      this.taskPool.push(task);
      task
        .then((res) => {
          if (res) {
            this.chunkUploadComplete(totalFile);
          }
          // 执行完成,从池中移除
          const item = this.taskPool.findIndex((x) => x === task);
          this.taskPool.splice(item);
        })
        .catch(() => {
          ElMessage.error('文件上传中断，请重新上传!');
          // this.chunkUploadDom.handleRemove(totalFile);
          return Promise.reject();
        });

      if (this.taskPool.length >= this.maxPoolsSize) {
        // 等待并发池执行完一个任务后
        await Promise.race(this.taskPool);
      }
    }
  }

  reset() {
    Object.assign(this.uploadStatus, {
      alreadyList: [] as string[],
      successNum: 0,
      uploadPercent: 0,
      isUploading: false,
      isProcessing: false,
    });
  }
}
