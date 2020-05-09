<template>
  <div class="page-content">
    <div class="c-650">
      <div class="sub-header">
        <div class="sub-header-title">基本信息</div>
      </div>
      <el-form
        label-position="left"
        label-width="120px"
        ref="roleRoot"
        :model="role"
      >
        <el-form-item label="名称：" prop="name" :rules="rules.name">
          <el-input v-model="role.name"></el-input>
        </el-form-item>
        <el-form-item
          label="描述："
          prop="description"
          :rules="rules.description"
        >
          <el-input
            type="textarea"
            rows="3"
            resize="none"
            placeholder="请输入描述"
            v-model="role.description"
          ></el-input>
        </el-form-item>
        <div class="sub-header">
          <div class="sub-header-title">权限信息</div>
        </div>
        <template v-for="item in permissions">
          <el-form-item :label="item.name" :key="item.slug">
            <el-checkbox-group v-model="role.permissions">
              <template v-for="permission in item.permissions">
                <el-checkbox
                  :label="permission.slug"
                  :key="permission.slug"
                  :name="item.name"
                >
                  {{ permission.name }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="handleRoleCreate">创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import servicePermission from "@/globals/service/permission.js";
import serviceRole from "@/globals/service/role.js";

export default {
  data() {
    return {
      permissions: [],
      role: {
        id: 1,
        name: "",
        description: "",
        permissions: []
      },
      rules: {
        name: { required: true, message: "请输入角色名称", trigger: "blur" },
        description: {
          required: true,
          message: "请输入角色描述",
          trigger: "blur"
        }
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      Promise.all([servicePermission.index()]).then(([permissions]) => {
        this.permissions = permissions;
      });
    },
    handleRoleCreate() {
      this.$refs["roleRoot"].validate(valid => {
        if (valid) {
          this.loading = true;
          serviceRole
            .create(this.role)
            .then(() => {
              this.$router.push({ name: "SettingRoles" });
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
