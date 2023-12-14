import {defineStore} from "pinia";
export const getUserStore = defineStore('theme',{
  state: () => ({
    loginBackground: "",
    themeColor: ""
  }),
  getters: {},
  actions: {
    setLoginBackground(url:string){
      this.loginBackground = url;
    }
  }
})