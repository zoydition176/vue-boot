import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {staticRouter} from "./modules/staticRouter";
import {errorRouter} from "./modules/errorRouter";
import {setNProgress} from "./plugin/nprogress";
import {getUserStore} from "@/stores/modules/user";

/*
  meta.title: 标题
  meta.isHidden: 是否隐藏
  meta.isKeepAlive: 是否缓存
  meta.isActive: 是否当前页
  meta.authFor: 对应的角色
* */

const routeMode = {
  hash: ()=> createWebHashHistory(),
  history: ()=> createWebHistory()
}
const router = createRouter({
  history: routeMode[import.meta.env.VITE_ROUTER_MODE](),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
router.beforeEach(async (to, from, next)=>{
  setNProgress().start();
  console.log(to, from, 'routerGuard');
  const userStore = getUserStore();
  const token = userStore.token;
  if(to.path === '/login'){
    if(token){
      // html5模式会默认先跳到"/"路径下，处理方案两种
      // 1.改成hash模式
      // 2.写一个中转页，夹带一个原路由的参数做跳转，通过中转页的路由跳回原页面
      return next({path: from.fullPath});
    }
    return next();
  }
  if(!token){
    return next({path: '/login', replace: true});
  }
  next();
});
router.onError((err)=>{
  setNProgress().done();
  console.error(err,'前端路由跳转错误');
});
router.afterEach(()=>{
  setNProgress().done();
  console.log('前端路由跳转完成');
});
export default router;
