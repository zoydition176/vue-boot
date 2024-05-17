import { defineStore } from 'pinia';
export const useThemeStore = defineStore('theme', {
  state: () => ({
    loginBackground: '',
    themeColor: '',
  }),
  getters: {},
  actions: {
    setLoginBackground(url: string) {
      this.loginBackground = url;
    },
  },
});
