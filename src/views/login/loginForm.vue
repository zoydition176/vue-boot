<template>
  <div class="login-form">
    23123login
    {{ formState }}
    <el-button @click="login">login</el-button>
  </div>
</template>
<script setup lang="ts" name="loginForm">
import { reactive } from 'vue';
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
function login() {
  formState.username =
}

</script>
<style scoped lang="scss">
.login-form{
  width: 500px;
}
</style>
