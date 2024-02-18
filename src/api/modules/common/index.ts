import requestHttp from '@/api/index';
enum Api {
  userLogin = '/user/login',
  userAuth = '/user/auth',
}

// 这个接口验证token就可以了
export function httpGetAuthList(){
  return requestHttp.get({ url: Api.userAuth }, {
    isTransformResponse: false
  });
}
