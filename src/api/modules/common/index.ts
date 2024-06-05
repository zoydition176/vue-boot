import httpVb from '@/api/axios/httpVb';
enum Api {
  userLogin = '/user/login',
  userAuth = '/user/auth',
  userInfo = '/user/info/',
}

export function httpLogin(data) {
  return httpVb.post(
    { url: Api.userLogin, data: data },
    {
      isTransformResponse: false,
    }
  );
}

// 这个接口验证token就可以了
export function httpGetAuthList() {
  return httpVb.get(
    { url: Api.userAuth },
    {
      isTransformResponse: false,
      mock: {
        isMock: true,
        data: [
          {
            name: 'System',
            path: '/system',
            redirect: 'noRedirect',
            component: 'Layout',
            meta: {
              title: 'sadzxcc',
              isHidden: 'system',
              isKeepAlive: false,
              isActive: null,
              isAffix: false,
              authFor: [],
              isTab: false,
            },
          },
        ],
      },
    }
  );
}

export function httpUserInfo(id: string) {
  return httpVb.get(
    { url: Api.userInfo + id },
    {
      isTransformResponse: false,
    }
  );
}
