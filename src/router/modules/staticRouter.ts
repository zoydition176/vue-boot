import {RouteRecordRaw} from "vue-router";

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("/@/views//home.vue"),
    children: []
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/src/views/login/login.vue"),
  },
  {
    path: "/table",
    name: "table",
    component: () => import("/src/views/table/index.vue"),
  },
];
