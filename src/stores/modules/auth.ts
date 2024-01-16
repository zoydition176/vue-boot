import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { handleAsideList } from "@/utils/auth";

export const authStore = defineStore('auth',{
  state: () => ({
    asideList: []
  }),
  getters: {
    showAsideList: (state) => {
      return handleAsideList(state.asideList);
    }
  },
  actions: {},
  persist: persistedOptionsConfig('auth')
})
