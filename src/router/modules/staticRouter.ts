import { RouteRecordRaw } from 'vue-router';

export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/tableEdit/index.vue'),
    meta: {
      title: 'cessss',
    },
  },
  {
    path: '/main/index',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    redirect: '/home',
    // layout下子路由为内容框内显示的页面
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
          isHidden: false,
          isKeepAlive: true,
          isActive: false,
          authFor: [],
          isAffix: true,
        },
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@/views/tableEdit/index.vue'),
        meta: {
          title: '表格',
        },
      },
      {
        name: 'system',
        path: '/system',
        meta: {
          title: '系统管理',
        },
        children: [
          {
            path: '/userManager',
            name: 'userManager',
            component: () => import('@/views/system/userManager/index.vue'),
            meta: {
              title: '用户列表',
            },
          },
          {
            path: '/roleManager',
            name: 'roleManager',
            component: () => import('@/views/system/roleManager/index.vue'),
            meta: {
              title: '角色列表',
            },
          },
          {
            path: '/menuManager',
            name: 'menuManager',
            component: () => import('@/views/system/menuManager/index.vue'),
            meta: {
              title: '菜单列表',
            },
          },
          {
            path: '/departmentManager',
            name: 'departmentManager',
            component: () => import('@/views/system/departmentManager/index.vue'),
            meta: {
              title: '部门列表',
            },
          },
          {
            path: '/permissionManager',
            name: 'permissionManager',
            component: () => import('@/views/system/permissionManager/index.vue'),
            meta: {
              title: '权限列表',
            },
          },
          {
            path: '/fileManager',
            name: 'fileManager',
            component: () => import('@/views/system/fileManager/index.vue'),
            meta: {
              title: '资源管理',
            },
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/system/profile/index.vue'),
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
];
