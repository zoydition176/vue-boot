import {ElMessage} from "element-plus";
import {isArray} from "lodash-es";

export function cloneD(obj: any){
  return JSON.parse(JSON.stringify(obj));
}

export function fileDownload(data: any, fileName: string){
  /* 兼容ie内核，360浏览器的兼容模式 */
  const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' });
  /* 兼容ie内核，360浏览器的兼容模式 */
  /* 火狐谷歌的文件下载方式 */
  const url1 = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url1;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}

export const checkFile = (file: Record<string, any>, rules: Record<string, any>, acceptMessage = "") => {
  const maxSize = rules.size || 150;
  const typeList = rules.accept || null;
  let res = false;
  if(file){
    if(file.size/1024/1024 > maxSize){
      ElMessage.error("上传文件的大小不能超过" + maxSize + "MB。");
      return false;
    }
    if(isArray(typeList)){
      if(typeList.includes(file.type)){
        res = true;
      }else{
        ElMessage.error(acceptMessage ? acceptMessage : ("上传文件的格式必须为" + typeList.join('，') + "类型。"));
        return false;
      }
    }else{
      res = true;
    }
  }
  return res;
}
