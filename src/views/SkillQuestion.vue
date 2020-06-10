<template>
  <div class="page-content" v-loading="loading">
    <div class="search-container">
      <el-form
        label-position="right"
        inline
        label-width="80px"
        :model="formData"
      >
        <el-form-item label="名称">
          <el-input
            v-model="formData.stem"
            placeholder="请填写题目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="技能：">
          <el-select v-model="formData.stack_id" placeholder="请选择技能分类">
            <el-option
              v-for="item in stacks"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData" style="margin-right: 20px;"
            >查询</el-button
          >
          <router-link :to="{ name: 'SkillQuestionCreate' }">
            <el-button size="medium" type="primary" plain>创建</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table class="mt-20" :data="questions" size="medium">
      <el-table-column prop="id" label="id" width="80px"> </el-table-column>
      <el-table-column prop="stem" label="名称">
        <template slot-scope="scope">
          <div class="stem-html" v-html="scope.row.stem"></div>
        </template>
      </el-table-column>
      <el-table-column label="技能">
        <template slot-scope="scope">
          <span>{{ scope.row.stack ? scope.row.stack.name : "-" }}</span>
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
import skillQuestionService from "@/globals/service/skillQuestion.js";
import stackService from "@/globals/service/stack.js";

export default {
  data() {
    return {
      loading: true,
      questions: [],
      stacks: [],
      formData: {
        stem: "",
        status_id: null
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
    stackService
      .index({
        status: 1,
        page_size: 1000,
        current_page: 1
      })
      .then(res => {
        this.stacks = res.rows;
      });
  },
  methods: {
    getData() {
      const params = {
        stem: this.formData.stem,
        stack_id: this.formData.stack_id,
        page_size: this.pagination.pageSize,
        current_page: this.pagination.currentPage
      };
      this.loading = true;
      skillQuestionService
        .index(params)
        .then(res => {
          this.questions = res.rows;
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
        this.$router.push({ name: "SkillQuestionEdit", params: { id } });
      } else if (type === "delete") {
        this.StackDestory(index);
      }
    },
    StackDestory(index) {
      const id = this.questions[index].id;
      const stem = this.questions[index].stem;
      this.$confirm(`确认删除题目「${stem}」吗？`)
        .then(() => {
          return skillQuestionService.destory(id);
        })
        .then(() => {
          this.$message.success("删除题目成功");
          this.questions.splice(index, 1);
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
.stem-html {
  img {
    max-width: 180px;
    height: auto !important;
  }
}
</style>
