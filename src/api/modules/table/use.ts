import requestHttp from '@/api/index';

console.log(requestHttp);

enum Api {
  userList = '/user/page',
}

export const getUserList = (params) => {
  return requestHttp.get({ url: Api.userList, params });
};