<template>
  <div class="page-content" v-loading="loading">
    <router-link :to="{ name: 'MaterialCreate' }">
      <el-button size="medium" type="primary" plain>创建物料</el-button>
    </router-link>
    <el-table class="mt-20" :data="materials" size="medium">
      <el-table-column prop="id" label="id" width="80px"> </el-table-column>
      <el-table-column prop="name" label="名称" width="200px">
      </el-table-column>
      <el-table-column prop="upload_file" label="内容">
        <template slot-scope="scope">
          <img
            v-if="scope.row.upload_file"
            class="material-content"
            :src="scope.row.upload_file"
            alt=""
          />
          <div v-if="scope.row.upload_file">
            <a :href="scope.row.upload_file" target="_blank">
              {{ scope.row.upload_file }}
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="jump_url" label="跳转链接" width="200px">
        <template slot-scope="scope">
          <div>
            <a :href="scope.row.jump_url" target="_blank">
              {{ scope.row.jump_url }}
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100" label="打开窗口" prop="target">
        <template slot-scope="scope">
          <span v-if="scope.row.target == '_self'">
            原窗口
          </span>
          <span v-if="scope.row.target == '_blank'">
            新窗口
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80px" align="right">
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
import serviceMaterial from "@/globals/service/material.js";
export default {
  data() {
    return {
      loading: true,
      materials: [],
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
      serviceMaterial
        .index(params)
        .then(res => {
          this.materials = res.rows;
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
        this.$router.push({ name: "MaterialEdit", params: { id } });
      } else if (type === "delete") {
        this.delMaterials(index);
      }
    },
    delMaterials(index) {
      const id = this.materials[index].id;
      this.$confirm("确认删除吗？")
        .then(() => {
          return serviceMaterial.destory(id);
        })
        .then(() => {
          this.$message.success("删除物料成功");
          this.materials.splice(index, 1);
        })
        .catch(() => {});
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.icon-ctrl {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: #3370ff;
  }
}
/deep/.el-table .cell {
  display: flex;
  align-items: center;
}
.material-content {
  flex: none;
  margin-right: 10px;
  height: 40px;
  width: 100px;
  background-size: 100px 40px;
}
</style>
