import { defineStore } from 'pinia';
import persistedOptionsConfig from '@/stores/modules/persistedState';
import { handleAsideList } from '@/utils/auth';
import { staticRouter } from '@/router/modules/staticRouter';
import { menuTypes } from '@/typing/base';
import { httpGetAuthList } from '@/api/modules/common';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    asideList: [] as menuTypes[],
  }),
  getters: {
    showAsideList: (state) => {
      return handleAsideList(state.asideList);
    },
  },
  actions: {
    // 登录加载权限菜单
    async getAuthAsideList() {
      const res: any[] = staticRouter;
      let tempRoute: menuTypes[] | undefined = [];
      const list = await httpGetAuthList();
      console.log(list, 'list');
      res.forEach((item) => {
        if (item.name === 'layout') {
          tempRoute = item.children;
        }
      });
      /*
       * 插入菜单
       * */
      this.asideList = [...tempRoute];
    },
    // 跳转时加载权限路由
    getAuthRoute() {
      console.log('getAuthRoute');
    },
  },
  persist: persistedOptionsConfig('auth'),
});
