import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";

export const useTabStore = defineStore('tabs',{
  state: () => ({
    tabsMap: new Map(),
  }),
  getters: {
    tabsList: state => {
      const temp: Recordable[] = [];
      for (const [key, value] of state.tabsMap) {
        key && temp.push(value);
      }
    }
  },
  actions: {
    addTabs(route){
      !this.tabsMap.has(route.fullPath) && this.tabsMap.set(route.fullPath, route);
    },
    removeTabs(path){
      !this.tabsMap.has(path) && this.tabsMap.delete(path);
    },

  },
  persist: persistedOptionsConfig('tabs')
})
