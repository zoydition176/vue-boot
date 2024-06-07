<template>
  <div class="profile">
    <el-form>
      <el-form-item label="头像">
        <el-avatar
          :src="data.avatarUrl"
          size="large"
        ></el-avatar>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          v-model="data.username"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input
          v-model="data.nickname"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="data.email"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="data.phone"
          disabled
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="profile">
import { getUserStore } from '@/stores/modules/user';
import { onMounted, ref } from 'vue';
import { userInfo } from '@/typing/base';
const data = ref<userInfo>({
  id: 0,
  username: '',
  password: '',
  nickname: '',
  avatarUrl: '',
  address: '',
  email: '',
  phone: '',
  role: 0,
});
onMounted(() => {
  getUserStore()
    .getInfo()
    .then((res) => {
      data.value = res;
      console.log(res, 'data');
    });
});
</script>
<style scoped lang="scss"></style>
