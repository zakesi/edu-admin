<template>
  <div class="page-content">
    <router-link :to="{ name: 'SettingRoleCreate' }">
      <el-button size="medium" type="primary" plain>添加角色</el-button>
    </router-link>
    <el-table class="mt-20" :data="roles">
      <el-table-column prop="id" label="ID" width="60"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="icon-ctrl">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="`edit-${scope.row.id}-${scope.$index}`"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                :command="`delete-${scope.row.id}-${scope.$index}`"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import serviceRole from "@/globals/service/role.js";

export default {
  data() {
    return {
      dialogFormVisible: false,
      roles: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      serviceRole.index().then(res => {
        this.roles = res;
      });
    },
    handleCommand(command) {
      const type = command.split("-")[0];
      const id = command.split("-")[1];
      const index = command.split("-")[2];
      if (type === "edit") {
        this.$router.push({
          name: "SettingRoleEdit",
          params: { id }
        });
      } else if (type === "delete") {
        this.delRole(index, id);
      }
    },
    delRole(index, id) {
      this.$confirm("确认删除吗？")
        .then(() => {
          this.loading = true;
          return serviceRole.destory(id);
        })
        .then(() => {
          this.roles.splice(index, 1);
          this.$message.success("删除成功");
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
