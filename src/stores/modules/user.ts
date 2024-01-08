import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
interface UserState {
  token: string;
  userInfo: { name: string };
}
export const getUserStore = defineStore('user',{
  state: ():UserState => ({
    token: "",
    userInfo: { name: "admin" }
  }),
  getters: {},
  actions: {
    setToken(token:string){
      this.token = token;
    }
  },
  persist: persistedOptionsConfig("vueboot-user")
})
