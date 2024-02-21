import requestHttp from '@/api/index';
enum Api {
  userLogin = '/user/login',
  userAuth = '/user/auth',
}

export function httpLogin(params){
  return requestHttp.post({ url: Api.userLogin, params }, {
    isTransformResponse: false
  });
}

// 这个接口验证token就可以了
export function httpGetAuthList(){
  return requestHttp.get({ url: Api.userAuth }, {
    isTransformResponse: false
  });
}
