import httpVb from "@/api/axios/httpVb";

enum Api {
  userList = '/user/page',
  updateUserList = '/user/save',
  deleteUser = '/user/id=',
  exportUserList = '/user/export',
  importUserList = '/user/import',
  fileUpload = '/file/upload',
  fileList = '/file/page'
}
export const getUserList = (params) => {
  return httpVb.get({ url: Api.userList, params });
};

export const getFileList = (params) => {
  return httpVb.get({ url: Api.fileList, params });
};

export const updateUserList = (data) => {
  return httpVb.post({ url: Api.updateUserList, data: data }, {
    isTransformResponse: false,
    // contentType: 'application/json;charset=UTF-8'
  });
};

export const deleteUser = (data) => {
  return httpVb.delete({ url: Api.deleteUser + data }, {
    isTransformResponse: false
  });
};

export const exportUserList = () => {
  return httpVb.blobDownload('GET', { url: Api.exportUserList }, {
    isTransformResponse: false
  });
}

export const importUserList = () => {
  return httpVb.post({ url: Api.importUserList }, {
    isTransformResponse: false
  });
}

export const httpUpload = (data) => {
  return httpVb.post({ url: Api.fileUpload, data: data }, {
    contentType: 'multipart/form-data;charset=UTF-8'
  })
}

export const httpFileDownload = (url) => {
  return httpVb.blobDownload('GET', { url: Api.exportUserList + url }, {
    isTransformResponse: false
  });
}
