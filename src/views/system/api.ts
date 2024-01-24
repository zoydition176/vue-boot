import requestHttp from '@/api/index';
enum Api {
  userList = '/user/page',
  updateUserList = '/user/save',
  deleteUser = '/user/id='
}
export const getUserList = (params) => {
  return requestHttp.get({ url: Api.userList, params }, {
    isTransformResponse: false
  });
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
