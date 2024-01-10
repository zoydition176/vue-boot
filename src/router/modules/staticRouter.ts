import {RouteRecordRaw} from "vue-router";

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    redirect: "/main/index",
  },
  {
    path: "/main/index",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
        children: [],
        meta: {
          title: 'home'
        }
      },
      {
        path: "/tableEdit",
        name: "tableEdit",
        component: () => import("@/views/tableEdit/index.vue"),
        meta: {
          title: '表格'
        }
      },
      {
        path: "/system",
        name: "system",
        meta: {
          title: '系统管理'
        },
      },
      {
        path: "/userManager",
        name: "userManager",
        component: () => import("@/views/system/userManager/index.vue"),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: "/roleManager",
        name: "roleManager",
        component: () => import("@/views/system/roleManager/index.vue"),
        meta: {
          title: '角色列表'
        }
      },
      {
        path: "/menuManager",
        name: "menuManager",
        component: () => import("@/views/system/menuManager/index.vue"),
        meta: {
          title: '菜单列表'
        }
      },
      {
        path: "/departmentManager",
        name: "departmentManager",
        component: () => import("@/views/system/departmentManager/index.vue"),
        meta: {
          title: '部门列表'
        }
      },
      {
        path: "/permissionManager",
        name: "permissionManager",
        component: () => import("@/views/system/permissionManager/index.vue"),
        meta: {
          title: '权限列表'
        }
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: '登录'
    }
  }
];
