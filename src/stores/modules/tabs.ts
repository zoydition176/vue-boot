import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { routeTabs } from "@/typing/base";
export const useTabStore = defineStore('tabs',{
  state: () => ({
    tabsMap: {}
  }),
  getters: {
    tabsList: state => {
      const temp: routeTabs[] = [];
      for(const key in state.tabsMap){
        temp.push(state.tabsMap[key]);
      }
      return temp;
    }
  },
  actions: {
    addTabs(routeParams: routeTabs){
      if(!this.tabsMap[routeParams.name]){
        this.tabsMap[routeParams.name] = routeParams;
      }
    },
    removeTabs(routeParams: routeTabs){
      if(!this.tabsMap[routeParams.name]){
        delete this.tabsMap[routeParams.name];
      }
    },
    initTabs(){
      return this.tabsList;
    }
  },
  persist: persistedOptionsConfig('tabs')
})
