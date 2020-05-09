<template>
  <div class="page-content">
    <router-link :to="{ name: 'SettingManagerCreate' }">
      <el-button
        size="medium"
        type="primary"
        plain
        @click="dialogFormVisible = true"
        >创建管理员</el-button
      >
    </router-link>
    <el-table class="mt-20" :data="managers">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          {{ scope.row.role ? scope.row.role.name : "-" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" align="right">
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
    <el-pagination
      class="mt-20"
      background
      layout="total, prev, pager, next, jumper"
      @current-change="getData"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>

<script>
import serviceManager from "@/globals/service/manager.js";
export default {
  data() {
    return {
      managers: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        page_size: this.pagination.pageSize,
        current_page: this.pagination.currentPage
      };
      this.loading = true;
      serviceManager
        .index(params)
        .then(res => {
          this.managers = res.rows;
          this.pagination.currentPage = res.pagination.current_page;
          this.pagination.pageSize = res.pagination.page_size;
          this.pagination.total = res.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCommand(command) {
      const type = command.split("-")[0];
      const id = command.split("-")[1];
      const index = command.split("-")[2];
      if (type === "edit") {
        this.$router.push({
          name: "SettingManagerEdit",
          params: { id }
        });
      } else if (type === "delete") {
        this.delManager(index, id);
      }
    },
    delManager(index, id) {
      this.$confirm("确认删除吗？")
        .then(() => {
          this.loading = true;
          return serviceManager.destory(id);
        })
        .then(() => {
          this.managers.splice(index, 1);
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
