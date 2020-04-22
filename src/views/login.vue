<template>
  <div class="login-page">
    <div class="page-content">
      <img class="page-logo" src="~@/assets/logo.png" />
      <div class="page-form_container">
        <el-form
          status-icon
          :rules="passwordRules"
          ref="passwordFrom"
          :model="passwordFrom"
          style="width:340px;"
        >
          <span>账号密码登陆</span>
          <el-form-item prop="phone">
            <el-input
              type="number"
              class="phone-input"
              prefix-icon="el-icon-mobile-phone"
              placeholder="请输手机号"
              autocomplete="off"
              v-model="passwordFrom.phone"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              autocomplete="off"
              show-password
              v-model="passwordFrom.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordFrom: {
        phone: "",
        password: ""
      },
      passwordRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    // this.$router.push({ path: "/dashboard" });
  },
  methods: {
    login() {
      // let data = this.passwordFrom;
      this.$refs["passwordFrom"].validate(valid => {
        if (valid) {
          this.$router.push({ path: "/dashboard" });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-page {
  background-color: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .page-content {
    transform: translateY(-50%);
    text-align: center;
    span {
      display: block;
      font-size: 12px;
      margin-bottom: 6px;
      text-align: left;
      font-weight: 600;
    }
    .page-logo {
      height: 32px;
      margin-bottom: 36px;
    }
    .page-form_container {
      display: flex;
      justify-content: center;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
