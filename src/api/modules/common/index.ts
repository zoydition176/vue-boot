import httpVb from '@/api/axios/httpVb'
enum Api {
  userLogin = '/user/login',
  userAuth = '/user/auth',
}

export function httpLogin(data) {
  return httpVb.post(
    { url: Api.userLogin, data: data },
    {
      isTransformResponse: false,
    }
  )
}

// 这个接口验证token就可以了
export function httpGetAuthList() {
  return httpVb.get(
    { url: Api.userAuth },
    {
      isTransformResponse: false,
      mock: {
        isMock: true,
        data: {
          list: [1, 2, 3],
        },
      },
    }
  )
}
