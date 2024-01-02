<template>
  <div>
    <button @click="test">123</button>
  </div>
</template>
<script setup lang="ts" name="tableEdit">
import { getUserList } from "@/api/modules/tableEdit/use";
import { ref } from "vue";
// const columns = [
//   {
//     title: 'ID',
//     name: 'id',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: 'username',
//     dataIndex: 'username',
//     key: 'username',
//   },
//   {
//     title: 'nickname',
//     dataIndex: 'nickname',
//     key: 'nickname',
//   },
//   {
//     title: 'address',
//     key: 'address',
//     dataIndex: 'address',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//   },
// ];

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