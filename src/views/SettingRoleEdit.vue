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
          <el-input v-show="editShow" v-model="role.name"></el-input>
          <span v-show="!editShow">{{ role.name }}</span>
        </el-form-item>
        <el-form-item
          label="描述："
          prop="description"
          :rules="rules.description"
        >
          <el-input
            v-show="editShow"
            type="textarea"
            rows="3"
            resize="none"
            placeholder="请输入描述"
            v-model="role.description"
          ></el-input>
          <span v-show="!editShow">{{
            role.description ? role.description : "暂无描述"
          }}</span>
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
                  :disabled="!editShow"
                >
                  {{ permission.name }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button
            v-show="!editShow"
            type="primary"
            plain
            @click="editShow = true"
            >编辑</el-button
          >
          <el-button v-show="editShow" type="primary" @click="editData"
            >保存</el-button
          >
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
      editShow: false,
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
      let id = this.$route.params.id;
      Promise.all([serviceRole.show(id), servicePermission.index()]).then(
        ([role, permissions]) => {
          this.role = role;
          this.permissions = permissions;
        }
      );
    },
    editData() {
      let id = this.$route.params.id;
      this.$refs["roleRoot"].validate(valid => {
        if (valid) {
          this.loading = true;
          serviceRole
            .update(id, this.role)
            .then(() => {
              this.$router.push({ name: "SettingRoles" });
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
