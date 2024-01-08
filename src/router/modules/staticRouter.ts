import {RouteRecordRaw} from "vue-router";

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main/index",
  },
  {
    path: "/main/index",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    children: []
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home.vue"),
    children: []
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/tableEdit",
    name: "tableEdit",
    component: () => import("@/views/tableEdit/index.vue"),
  },
];
