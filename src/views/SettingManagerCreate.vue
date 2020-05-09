<template>
  <div class="page-content" v-loading="loading">
    <div class="c-650">
      <div class="sub-header">
        <div class="sub-header-title">基本信息</div>
      </div>
      <el-form
        label-position="left"
        label-width="80px"
        :model="manager"
        ref="manager"
      >
        <el-form-item label="名称" prop="name" :rules="rules.name">
          <el-input v-model="manager.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" :rules="rules.phone">
          <el-input v-model.number="manager.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :rules="rules.role">
          <el-select v-model="manager.role_id" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleManagerCreate"
            >创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import serviceManager from "@/globals/service/manager.js";
import serviceRole from "@/globals/service/role.js";

export default {
  data() {
    return {
      loading: true,
      roles: [],
      manager: {
        name: "",
        phone: "",
        role_id: ""
      },
      rules: {
        name: { required: true, message: "请输入姓名", trigger: "blur" },
        role: { required: true, message: "请选择角色", trigger: "change" },
        phone: [
          { required: true, message: "请输入手机号码", trigger: "change" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    Promise.all([serviceRole.index()])
      .then(([roles]) => {
        this.roles = roles;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    handleManagerCreate() {
      this.$refs["manager"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.manager.phone = String(this.manager.phone);
          serviceManager
            .create(this.manager)
            .then(() => {
              this.$router.push({ name: "SettingManager" });
              this.$message.success("创建成功");
            })
            .finally(() => (this.loading = false));
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
