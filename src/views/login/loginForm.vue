<template>
  <div class="login-form">
    <el-form ref="loginFormRef">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="formState.username" />
      </el-form-item>
      <el-form-item prop="password" label="口令">
        <el-input v-model="formState.password" />
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
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

function login() {
  console.log(formState);
  console.log();
  loginFormRef.value?.validate((valid)=>{
    if(valid) {
      loading.value = true;
      setTimeout(()=>{
        loading.value = false;
      }, 2000);
    }
  });
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
