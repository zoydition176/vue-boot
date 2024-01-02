import { createApp } from 'vue';
import './style.css';
import pinia from "@/stores";
import router from "@/router";
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(pinia).use(router).use(ElementPlus).mount('#app');
