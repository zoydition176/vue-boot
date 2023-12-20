<template>
  <a-config-provider :locale="locate" :theme="{
    token: { colorPrimary: data.colorPrimary, borderRadius: `${data.borderRadius}px` }
  }">
    <RouterView />
  </a-config-provider>
</template>
<script setup lang="ts">
// import httpRequest from '/@/api/index';
// import { theme } from 'ant-design-vue';
import {onMounted, reactive, ref} from "vue";

const locate = ref();
const data = reactive({
  colorPrimary: '#428dff',
  borderRadius: 3
})
onMounted(()=>{
  // httpRequest.get({ url: '/user' }).then((res)=>{
  //   console.log(res,'dasdd');
  // });
})
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
