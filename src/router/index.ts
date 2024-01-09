import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {staticRouter} from "./modules/staticRouter";
import {errorRouter} from "./modules/errorRouter";
import {setNProgress} from "./plugin/nprogress";
import {getUserStore} from "@/stores/modules/user";
// import {getUserStore} from "/@/stores/modules/user";
// import {LOGIN_URL} from "/@/router/constant";

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
