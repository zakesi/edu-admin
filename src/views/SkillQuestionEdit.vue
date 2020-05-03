<template>
  <div class="page-content" v-loading="loading">
    <div class="c-650">
      <div class="sub-header">
        <div class="sub-header-title">基本信息</div>
      </div>
      <el-form label-position="top" label-width="80px" size="mini">
        <el-form-item label="题目：">
          <el-input type="textarea" v-model="question.stem"></el-input>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="技能：">
              <el-select
                v-model="question.stack_id"
                placeholder="请选择技能分类"
              >
                <el-option
                  v-for="item in stacks"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级：">
              <el-select v-model="question.level" placeholder="请选择题目难度">
                <el-option
                  v-for="(value, key) in levelOption"
                  :key="key"
                  :label="value"
                  :value="key"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="选项：">
          <el-row :gutter="20">
            <div v-for="(opt, index) in question.option" :key="index">
              <el-col :span="22" style="margin-bottom: 8px;">
                <el-input
                  type="textarea"
                  v-model="question.option[index]"
                ></el-input>
              </el-col>
              <el-col :span="2">
                <el-button
                  size="mini"
                  @click="handleOptionDestory(index)"
                  plain
                  type="danger"
                  >x</el-button
                >
              </el-col>
            </div>
          </el-row>
          <el-button
            size="mini"
            plain
            @click="handleOptionCreate"
            v-show="showAddButton"
            style="margin-top: 8px;"
            >+</el-button
          >
        </el-form-item>
        <el-form-item label="答案：">
          <el-radio-group v-model="question.currect">
            <el-radio
              :label="index"
              v-for="(opt, index) in question.option"
              :key="index"
              >{{ currectOption[index] }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" plain @click="handleSubmit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import skillQuestionService from "@/globals/service/skillQuestion.js";
import stackService from "@/globals/service/stack.js";

export default {
  data() {
    return {
      loading: true,
      fileList: [],
      stacks: [],
      question: {
        stem: "",
        stack_id: null,
        level: null,
        option: [],
        current: ""
      },
      currectOption: {
        0: "A",
        1: "B",
        2: "C",
        3: "D"
      },
      levelOption: {
        1: "入门",
        2: "初阶",
        3: "进阶",
        4: "高阶"
      }
    };
  },
  computed: {
    showAddButton() {
      return (this.question.option || []).length < 4;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        page_size: 50,
        current_page: 1
      };
      this.loading = true;
      const id = this.$route.params.id;
      Promise.all([stackService.index(params), skillQuestionService.show(id)])
        .then(([resStack, resSkillQuestion]) => {
          this.stacks = resStack.rows;
          const question = { ...resSkillQuestion.question };
          question.option = question.option ? JSON.parse(question.option) : [];
          this.question = question;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleOptionCreate() {
      this.question.option.push("");
    },
    handleOptionDestory(index) {
      this.question.option.splice(index, 1);
    },
    handleSubmit() {
      this.loading = true;
      const params = { ...this.question };
      params.level = Number(this.question.level);
      params.option = JSON.stringify(this.question.option);
      const id = this.$route.params.id;
      skillQuestionService
        .edit(id, params)
        .then(() => {
          this.$message.success("保存成功");
          this.$router.push({
            name: "SkillQuestion"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.sub-header {
  position: relative;
  color: #1f2329;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 24px;
  &:before {
    content: "";
    position: absolute;
    top: 4px;
    left: -20px;
    border-left: 4px solid #4e83fd;
    height: 16px;
  }
  .sub-header-fd {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
