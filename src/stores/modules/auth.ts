import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { handleAsideList } from "@/utils/auth";
import { staticRouter } from "@/router/modules/staticRouter";
import { menuTypes } from "@/typing/base";
// import { httpGetAuthList } from "@/api/modules/common";

export const useAuthStore = defineStore('auth',{
  state: () => ({
    asideList: [] as menuTypes[]
  }),
  getters: {
    showAsideList: (state) => {
      return handleAsideList(state.asideList);
    }
  },
  actions: {
    async getAuthAsideList(){
      const res: any[] = staticRouter;
      let tempRoute: menuTypes[] | undefined = [];
      res.forEach((item)=>{
        if(item.name === 'layout'){
          tempRoute = item.children;
        }
      })
      /*
      * 插入菜单/权限路由
      * */
      this.asideList = [...tempRoute];
    }
  },
  persist: persistedOptionsConfig('auth')
})
