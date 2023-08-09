<template>
  <div
    class="absolute login-form-content flex justify-center items-center q-pa-xl"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" clearable />
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox
          v-model="ruleForm.checked"
          label="保存密码"
          true-label="true"
          false-label="false"
        />
      </el-form-item>
      <el-form-item label-width="0">
        <div class="w-full flex justify-center">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store/user";
import { LoginApi } from "@/api/common/index";
import { LoginFormInterface } from "@/api/common/modules/index";
import { lnMessage } from "@/utils/fun";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

interface RuleForm {
  username: string;
  password: string;
  checked: string;
}

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<RuleForm>({
  username: "",
  password: "",
  checked: "false",
});

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "请输入登录用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
});

// 点击登录按钮
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      handleLogin();
    }
  });
};

// 提交登录数据
const handleLogin = async () => {
  // 存储登录信息
  userStore.setLoginInfo(ruleForm);
  const loginForm: LoginFormInterface = {
    username: ruleForm.username,
    password: ruleForm.password,
  };
  const res = await LoginApi(loginForm);
  if (res.code === 200) {
    lnMessage(res.msg);
    userStore.setUserInfo(res.data.token, res.data.uid);
    setTimeout(() => {
      router.push(import.meta.env.VITE_HOME_PATH);
    }, 500);
  }
};

onMounted(() => {
  // 获取存储的登录信息，如上次登录保存密码则赋值
  const { username, password, checked } = userStore.getLoginInfo;
  if (checked === "true") {
    ruleForm.username = username;
    ruleForm.password = password;
    ruleForm.checked = checked;
  }
});
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .login-form-content {
    width: 500px;
    height: 350px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 750px) {
  .login-form-content {
    width: 100vw;
    height: 100vh;
  }
}

.login-form-content {
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);

  .demo-ruleForm {
    width: 80%;
    padding: 8px;
  }
}
</style>
