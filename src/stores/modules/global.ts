import { defineStore } from "pinia";
type LayoutType = "vertical" | "normal" | "transverse" | "columns";

type AssemblySizeType = "large" | "default" | "small";

type LanguageType = "zh" | "en" | null;
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
    return {
      layout: "normal"
    }
  },
})
