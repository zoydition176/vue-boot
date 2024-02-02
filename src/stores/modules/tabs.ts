import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";
import { routeTabs } from "@/typing/base";
import { TabPaneName } from "element-plus";
import router from "@/router"

export const useTabStore = defineStore('tabs',{
  // Using Map to manage tabs list, But the order of object properties may be a problem
  state: (): any => ({
    tabsMap: {},
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
      // keep the order of keys
      if(!this.tabsMap[routeParams.name]){
        this.tabsMap[routeParams.name] = routeParams;
      }
    },
    removeTabs(name: TabPaneName){
      if(this.tabsMap[name]){
        delete this.tabsMap[name];
        const temp = this.tabsList[this.tabsList.length - 1];
        router.push({
          name: temp.name
        })
      }
    },
    initTabs(){
      this.tabsMap = {
        'home': {
          name: 'home',
          fullPath: '',
          title: '首页',
          isHidden: false,
          isKeepAlive: false,
          isActive: true,
          isAffix: true,
        }
      };
    }
  },
  persist: persistedOptionsConfig('tabs')
})
