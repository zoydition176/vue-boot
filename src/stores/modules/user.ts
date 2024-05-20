import { defineStore } from 'pinia';
import persistedOptionsConfig from '@/stores/modules/persistedState';
import { encryptByAES } from '@/utils/cipher/crypto';
import router from '@/router';
interface UserState {
  token: string;
  userInfo: {
    name: string;
    nickname: string;
    id: string;
    avatar: string;
  };
}
export const getUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: {
      name: '',
      nickname: '',
      id: '',
      avatar: '',
    },
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = encryptByAES(token);
    },
    setUserInfo(data: UserState['userInfo']) {
      this.userInfo = data;
    },
    async userLogout() {
      // const router = useRouter();
      this.token = '';
      this.userInfo = {
        name: '',
        nickname: '',
        id: '',
        avatar: '',
      };
      await router.replace('/login');
    },
    getInfo() {
      return new Promise((resolve) => {
        resolve('success');
      });
    },
  },
  persist: persistedOptionsConfig('vueboot-user'),
});
