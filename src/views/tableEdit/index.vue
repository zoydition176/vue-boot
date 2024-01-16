<template>
  <div>
    <button @click="test">123</button>
  </div>
</template>
<script setup lang="ts" name="tableEdit">
import { getUserList } from "@/api/modules/tableEdit/use";
import { ref } from "vue";

const data = ref();

function test() {
  getUserList({
    pageNum: 1,
    pageSize: 10
  }).then((res)=>{
    data.value = res.records;
  });
}

</script>
<style scoped lang="scss">

</style>
