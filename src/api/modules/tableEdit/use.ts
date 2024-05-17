import httpVb from '@/api/axios/httpVb';
enum Api {
  userList = '/user/page',
}
export const getUserList = (params) => {
  return httpVb.get(
    { url: Api.userList, params },
    {
      isTransformResponse: false,
    }
  );
};
