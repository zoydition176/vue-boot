<template>
  <div class="login-form">
    <el-form
      :model="formState"
      :rules="rules"
      ref="loginFormRef"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formState.username" placeholder="user4"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formState.password" placeholder="123456" type="password"></el-input>
      </el-form-item>
      <el-form-item label="记住密码">
        <el-switch v-model="formState.remember" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item>
        <div class="login-btn">
          <el-button :icon="CircleClose" size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
          <el-button :icon="UserFilled" size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
            登录
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="loginForm">
import { reactive, ref } from 'vue';
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { ElMessage, FormInstance } from "element-plus";
import { getUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { httpLogin } from "@/api/modules/common";
interface FormState {
  username: string;
  password: string;
  remember?: boolean;
}
const router = useRouter();
const userStore = getUserStore();
const authStore = useAuthStore();
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

function login(elForm: FormInstance | undefined) {
  if(!elForm) return;
  loading.value = true;
  elForm.validate(async (valid)=>{
    if(valid){
      try {
        const res = await httpLogin({
          username: formState.username,
          password: formState.password
        });
        console.log(res, 'login res');
        if(res.code === '200'){
          userStore.setToken('this is JWT response');
          await authStore.getAuthAsideList();
          await router.push('/main/index');
        }
      } catch (error) {
        ElMessage.error(error + '登录失败！');
      }
    }
    loading.value = false;
  })
}

function resetForm(elForm: FormInstance | undefined) {
  elForm && elForm.resetFields();
}

</script>
<style scoped lang="scss">
.login-form{
  width: 500px;
  padding: 30px 20px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
}
.login-btn{}
</style>
