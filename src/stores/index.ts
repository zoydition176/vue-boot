import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
// 引入pinia持久化存储插件，顺带解决了本地存储问题
pinia.use(piniaPluginPersistedstate);

export default pinia;