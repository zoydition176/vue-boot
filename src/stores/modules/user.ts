import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { encryptByAES } from "@/utils/cipher/crypto";
interface UserState {
  token: string;
  userInfo: { 
    name: string,
    nickname: string,
    id: string,
    avatar: string,
   };
}
export const getUserStore = defineStore('user',{
  state: (): UserState => ({
    token: "",
    userInfo: { 
      name: "",
      nickname: "",
      id: "",
      avatar: "",
    }
  }),
  getters: {},
  actions: {
    setToken(token: string){
      this.token = encryptByAES(token);
    },
    setUserInfo(data: UserState["userInfo"]){
      this.userInfo = data;
    }
  },
  persist: persistedOptionsConfig("vueboot-user")
})
