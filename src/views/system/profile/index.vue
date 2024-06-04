<template>
  <div>123213</div>
</template>
<script setup lang="ts" name="profile">
import { getUserStore } from '@/stores/modules/user';
import { onMounted, ref } from 'vue';
const useId = getUserStore().userInfo.id;
const data = ref();
onMounted(() => {
  getUserStore()
    .getInfo(useId)
    .then((res) => {
      data.value = res;
      console.log(data.value, 'data');
    });
});
</script>
<style scoped lang="scss"></style>
