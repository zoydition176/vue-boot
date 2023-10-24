import { createApp } from 'vue';
import './style.css';
import pinia from "/@/stores";
import router from "/@/router";
import App from './App.vue';

const app = createApp(App);
app.use(pinia).use(router).mount('#app');

