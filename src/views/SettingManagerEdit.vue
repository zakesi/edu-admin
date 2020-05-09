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
        <el-form-item
          label="名称"
          prop="name"
          :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
        >
          <el-input v-model="manager.name"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phone"
          :rules="[
            { required: true, message: '请输入手机号码', trigger: 'change' },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '目前只支持中国大陆的手机号码',
              trigger: 'blur'
            }
          ]"
        >
          <el-input v-model.number="manager.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="role_id"
          :rules="{ required: true, message: '请选择角色', trigger: 'change' }"
        >
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
          <el-button type="primary" @click="editManager()">编辑</el-button>
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
        password: ""
      }
    };
  },
  created() {
    const id = this.$route.params.id;
    Promise.all([serviceManager.show(id), serviceRole.index()])
      .then(([manager, roles]) => {
        this.manager = manager;
        this.roles = roles;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    editManager() {
      const id = this.$route.params.id;
      this.$refs["manager"].validate(valid => {
        if (valid) {
          this.loading = true;
          serviceManager
            .update(id, this.manager)
            .then(() => {
              this.$router.push({ name: "SettingManager" });
              this.$message.success("编辑成功");
            })
            .finally(() => (this.loading = false));
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
