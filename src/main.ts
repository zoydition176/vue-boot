import { createApp } from 'vue';
import './style.css';
import pinia from "/@/stores";
import App from './App.vue';

const app = createApp(App);
app.use(pinia).mount('#app');

