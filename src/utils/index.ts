export function cloneD(obj: any){
  return JSON.parse(JSON.stringify(obj));
}

export function fileDownload(data: any, fileName: string){
  /* 兼容ie内核，360浏览器的兼容模式 */
  const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' });
  /* 兼容ie内核，360浏览器的兼容模式 */
  /* 火狐谷歌的文件下载方式 */
  let url1 = window.URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url1;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}