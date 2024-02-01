import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { routeTabs } from "@/typing/base";
import { TabPaneName } from "element-plus";
export const useTabStore = defineStore('tabs',{
  state: () => ({
    tabsMap: {}
  }),
  getters: {
    tabsList: state => {
      const temp: routeTabs[] = [];
      const arr = Object.getOwnPropertySymbols(state.tabsMap);
      for(let i = 0;i<arr.length;i++){
        temp.push(state.tabsMap[arr[i]]);
      }
      console.log(state.tabsMap, temp, '123456');
      return temp;
    }
  },
  actions: {
    addTabs(routeParams: routeTabs){
      // keep the order of keys
      if(!this.tabsMap[routeParams.name]){
        const tempProperty = Symbol(routeParams.name);
        this.tabsMap[tempProperty] = routeParams;
      }
    },
    removeTabs(name: TabPaneName){
      if(this.tabsMap[name]){
        const tempProperty = Symbol(name);
        delete this.tabsMap[tempProperty];
      }
    },
    initTabs(){
      return this.tabsList;
    }
  },
  persist: persistedOptionsConfig('tabs')
})
