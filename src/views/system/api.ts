import requestHttp from '@/api/index';
enum Api {
  userList = '/user/page',
  updateUserList = '/user/save'
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
