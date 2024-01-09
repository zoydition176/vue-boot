import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { encryptByAES } from "@/utils/cipher/crypto";
interface UserState {
  token: string;
  userInfo: { name: string };
}
export const getUserStore = defineStore('user',{
  state: (): UserState => ({
    token: "",
    userInfo: { name: "admin" }
  }),
  getters: {},
  actions: {
    setToken(token: string){
      this.token = encryptByAES(token);
    }
  },
  persist: persistedOptionsConfig("vueboot-user")
})
