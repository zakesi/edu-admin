<template>
  <div class="page-content" v-loading="loading">
    <router-link :to="{ name: 'CompanyCreate' }">
      <el-button size="medium" type="primary" plain>创建企业</el-button>
    </router-link>
    <el-table class="mt-20" :data="companies" size="medium">
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
import companyService from "@/globals/service/company.js";
export default {
  data() {
    return {
      loading: true,
      companies: [],
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
      companyService
        .index(params)
        .then(res => {
          this.companies = res.rows;
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
        this.$router.push({ name: "CompanyEdit", params: { id } });
      } else if (type === "delete") {
        this.companyDestory(index);
      }
    },
    companyDestory(index) {
      const id = this.companies[index].id;
      const name = this.companies[index].name;
      this.$confirm(`确认删除企业「${name}」吗？`)
        .then(() => {
          return companyService.destory(id);
        })
        .then(() => {
          this.$message.success("删除企业成功");
          this.companies.splice(index, 1);
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
