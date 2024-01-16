import requestHttp from '@/api/index';
enum Api {
  userList = '/user/page',
}
export const getUserList = (params) => {
  return requestHttp.get({ url: Api.userList, params }, {
    isTransformResponse: false
  });
};
