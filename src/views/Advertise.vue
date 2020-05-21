<template>
  <div class="page-content" v-loading="loading">
    <router-link :to="{ name: 'AdvertiseCreate' }">
      <el-button size="medium" type="primary" plain>创建广告</el-button>
    </router-link>
    <el-table class="mt-20" :data="advertises" size="medium">
      <el-table-column prop="id" label="id" width="80px"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="slug" label="slug"> </el-table-column>
      <el-table-column prop="width" label="尺寸：宽"> </el-table-column>
      <el-table-column prop="height" label="尺寸：高"> </el-table-column>
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
import serviceAdvertise from "@/globals/service/advertise.js";
export default {
  data() {
    return {
      loading: true,
      advertises: [],
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
      serviceAdvertise
        .index(params)
        .then(res => {
          this.advertises = res.rows;
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
        this.$router.push({ name: "AdvertiseEdit", params: { id } });
      } else if (type === "delete") {
        this.delAdvertises(index);
      }
    },
    delAdvertises(index) {
      const id = this.advertises[index].id;
      this.$confirm("确认删除吗？")
        .then(() => {
          return serviceAdvertise.destory(id);
        })
        .then(() => {
          this.$message.success("删除广告成功");
          this.advertises.splice(index, 1);
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
