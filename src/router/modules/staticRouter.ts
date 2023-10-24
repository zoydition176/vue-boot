import {RouteRecordRaw} from "vue-router";

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    redirect: "/home",
    component: () => import("@/views/home.vue"),
    children: []
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
];
