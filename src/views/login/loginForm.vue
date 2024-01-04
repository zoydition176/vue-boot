<template>
  <div class="login-form">
    <el-form
      :model="formState"
      :rules="rules"
      ref="loginFormRef"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formState.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formState.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="记住密码">
        <el-switch v-model="formState.remember" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>

    <el-button :icon="CircleClose" round size="large" @click="resetForm()"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      登录
    </el-button>
  </div>
</template>
<script setup lang="ts" name="loginForm">
import { reactive, ref } from 'vue';
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const loginFormRef = ref<FormInstance>();
const loading = ref(false);
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
  ],
};
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

function login() {
  console.log(formState);
  console.log();
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

function resetForm() {
  loginFormRef.value?.resetFields();
}

</script>
<style scoped lang="scss">
.login-form{
  width: 500px;
}
</style>
