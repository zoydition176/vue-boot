import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { staticRouter } from './modules/staticRouter';
import { errorRouter } from './modules/errorRouter';
import { setNProgress } from './plugin/nprogress';
import { getUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';
// import {getToken} from "@/utils/auth";

/*
  meta.title: 标题
  meta.isHidden: 是否隐藏
  meta.isKeepAlive: 是否缓存
  meta.isActive: 是否当前页
  meta.isAffix: 标签页是否能关闭
  meta.authFor: 对应的角色
  meta.isTab: 是否是标签页
* */

const routeMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
};
const router = createRouter({
  history: routeMode[import.meta.env.VITE_ROUTER_MODE](),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
router.beforeEach(async (to, from, next) => {
  setNProgress().start();
  console.log(to, from, 'routerGuard');
  const authStore = useAuthStore();
  const userStore = getUserStore();
  const token = userStore.token;
  if (to.path === '/login') {
    if (token) {
      return next({ path: from.fullPath });
    }
    return next();
  }
  if (!token) {
    return next({ path: '/login', replace: true });
  }
  // 加载动态路由
  await authStore.getAuthRoute();
  next();

  if (token) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: from.fullPath });
    } else {
      if (userStore.userInfo) {
        // 判断当前用户是否已拉取完user_info信息
        userStore
          .getInfo()
          .then(() => {
            authStore.getAuthRoute().then((res: any) => {
              res.forEach((route) => {
                if (route.path && !(route.path.indexOf('http://') !== -1 || route.path.indexOf('https://') !== -1)) {
                  router.addRoute(route); // 动态添加可访问路由表
                }
              });
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            });
          })
          .catch((err) => {
            console.log(err, 'err');
            userStore.userLogout();
          });
      } else {
        next();
      }
    }
  } else {
    // 没有token
    await userStore.userLogout();
  }
});
router.onError((err) => {
  setNProgress().done();
  console.error(err, '前端路由跳转错误');
});
router.afterEach(() => {
  setNProgress().done();
  console.log('前端路由跳转完成');
});
export default router;
