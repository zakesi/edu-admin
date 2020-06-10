<template>
  <div class="page-content" v-loading="loading">
    <div class="search-container">
      <el-form
        label-position="right"
        inline
        label-width="80px"
        :model="formData"
        @submit.native.prevent
      >
        <el-form-item label="名称">
          <el-input
            v-model="formData.name"
            placeholder="请填写技能栈名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="formData.status"
            size="medium"
            placeholder="状态"
            clearable
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="全部" :value="''"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData" style="margin-right: 20px;"
            >查询</el-button
          >
          <router-link :to="{ name: 'StackCreate' }">
            <el-button size="medium" type="primary" plain>创建</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table class="mt-20" :data="stacks" size="medium">
      <el-table-column prop="id" label="id" width="80px"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
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
import stackService from "@/globals/service/stack.js";
export default {
  data() {
    return {
      loading: true,
      stacks: [],
      formData: {
        name: "",
        status: 1
      },
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
        name: this.formData.name,
        status: this.formData.status,
        page_size: this.pagination.pageSize,
        current_page: this.pagination.currentPage
      };
      this.loading = true;
      stackService
        .index(params)
        .then(res => {
          this.stacks = res.rows;
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
        this.$router.push({ name: "StackEdit", params: { id } });
      } else if (type === "delete") {
        this.StackDestory(index);
      }
    },
    StackDestory(index) {
      const id = this.stacks[index].id;
      const name = this.stacks[index].name;
      this.$confirm(`确认删除企业「${name}」吗？`)
        .then(() => {
          return stackService.destory(id);
        })
        .then(() => {
          this.$message.success("删除企业成功");
          this.stacks.splice(index, 1);
        })
        .catch(() => {});
    }
  }
};
</script>

<style type="text/css" lang="less">
.icon-ctrl {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: #3370ff;
  }
}
</style>
