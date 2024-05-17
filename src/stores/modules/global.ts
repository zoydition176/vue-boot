import { defineStore } from 'pinia';
import persistedOptionsConfig from '@/stores/modules/persistedState';

type LayoutType = 'vertical' | 'normal' | 'transverse' | 'columns';
type AssemblySizeType = 'large' | 'default' | 'small';
type LanguageType = 'zh' | 'en' | null;
interface globalStats {
  layout: LayoutType;
  assemblySize?: AssemblySizeType;
  language?: LanguageType;
  maximize?: boolean;
  primary?: string;
  isDark?: boolean;
  isGrey?: boolean;
  isWeak?: boolean;
  asideInverted?: boolean;
  headerInverted?: boolean;
  isCollapse?: boolean;
  accordion?: boolean;
  breadcrumb?: boolean;
  breadcrumbIcon?: boolean;
  tabs?: boolean;
  tabsIcon?: boolean;
  footer?: boolean;
}
export const getGlobalStore = defineStore('global', {
  state(): globalStats {
    // 默认使用normal布局
    return {
      layout: 'normal',
    };
  },
  actions: {
    setGlobalLayout(name: LayoutType) {
      this.layout = name;
    },
  },
  persist: persistedOptionsConfig('vueboot-global'),
});
