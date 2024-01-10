import { defineStore } from "pinia";
import persistedOptionsConfig from "@/stores/modules/persistedState";

export const authStore = defineStore('auth',{
  state: () => ({}),
  getters: {},
  actions: {},
  persist: persistedOptionsConfig('auth')
})
