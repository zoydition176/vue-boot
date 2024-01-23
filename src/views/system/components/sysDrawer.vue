<template>
  <el-drawer ref="drawerDom" v-model="editDrawer" :rules="rules" title="编辑" :destroy-on-close="true" append-to-body>
    <el-form label-width="80px" ref="drawerFormRef">
      <el-form-item label="用户名">
        <el-input v-model="drawerProps.row.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="drawerProps.row.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="真名">
        <el-input v-model="drawerProps.row.nickname" placeholder="请输入真名"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="drawerProps.row.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="drawerProps.row.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="drawerProps.row.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="drawerProps.row.avatar" placeholder="请输入头像地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts" name="sysDrawer">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const drawerDom = ref<FormInstance>();
const drawerFormRef = ref<FormInstance>();
const editDrawer = ref(false);
const drawerProps = ref({
  isView: false,
  title: "",
  row: {
    username: '',
    password: '',
    nickname: '',
    address: '',
    email: '',
    phone: '',
    avatar: ''
  }
});
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入真名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
  ],
  address: [
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  phone: [
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  avatar: [
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
};
function handleSave(){
  console.log(drawerFormRef, 'form');
}
function acceptParams(params: any){
  console.log(params, 'params');
  editDrawer.value = true;
  if(!params.isEdit){
    drawerFormRef.value?.resetFields();
  }else{

  }
}
defineExpose({
  acceptParams
})
</script>
<style scoped lang="scss">

</style>
