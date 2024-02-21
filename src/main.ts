import { createApp } from 'vue';
import './style.css';
// import './styles/main.scss';
import pinia from "@/stores";
import router from "@/router";
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import _ from 'lodash-es';

const app = createApp(App);
app.config.globalProperties._$ = _;
app.use(pinia).use(router).use(ElementPlus).mount('#app');
