import {defineStore} from "pinia";
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
  }
})
