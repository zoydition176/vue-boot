import { createApp } from 'vue';
import './style.css';
import pinia from "/@/stores";
import router from "/@/router";
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(pinia).use(router).use(Antd).mount('#app');
