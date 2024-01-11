import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { getAsideList } from "@/utils/auth";

export const authStore = defineStore('auth',{
  state: () => ({
    asideList: []
  }),
  getters: {
    showAsideList: (state) => {
      return getAsideList(state.asideList);
    }
  },
  actions: {},
  persist: persistedOptionsConfig('auth')
})
