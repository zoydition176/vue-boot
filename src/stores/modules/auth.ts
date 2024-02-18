import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { handleAsideList } from "@/utils/auth";
import { httpGetAuthList } from "@/api/modules/common";
import { staticRouter } from "@/router/modules/staticRouter";

export const useAuthStore = defineStore('auth',{
  state: () => ({
    asideList: []
  }),
  getters: {
    showAsideList: (state) => {
      return handleAsideList(state.asideList);
    }
  },
  actions: {
    async getAuthAsideList(){
      const res = await httpGetAuthList();
      this.asideList = [...res, ...staticRouter];
    }
  },
  persist: persistedOptionsConfig('auth')
})
