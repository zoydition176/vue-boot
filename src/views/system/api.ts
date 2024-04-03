import requestHttp from '@/api/index';

enum Api {
  userList = '/user/page',
  updateUserList = '/user/save',
  deleteUser = '/user/id=',
  exportUserList = '/user/export',
  importUserList = '/user/import',
  fileUpload = '/file/upload',
}
export const getUserList = (params) => {
  return requestHttp.get({ url: Api.userList, params });
};

export const updateUserList = (params) => {
  return requestHttp.post({ url: Api.updateUserList, params }, {
    isTransformResponse: false
  });
};

export const deleteUser = (data) => {
  return requestHttp.delete({ url: Api.deleteUser + data }, {
    isTransformResponse: false
  });
};

export const exportUserList = () => {
  return requestHttp.blobDownload('GET', { url: Api.exportUserList }, {
    isTransformResponse: false
  });
}

export const importUserList = () => {
  return requestHttp.post({ url: Api.importUserList }, {
    isTransformResponse: false
  });
}

export const httpUpload = (data) => {
  console.log(data, 'withCredentials');
  return requestHttp.post({ url: Api.fileUpload, data: data, transformRequest: [
      (data) => data,
    ] }, {
    contentType: 'multipart/form-data;charset=UTF-8'
  })
}
