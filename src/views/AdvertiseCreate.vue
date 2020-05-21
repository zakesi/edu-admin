<template>
  <div class="page-content">
    <div class="c-650">
      <div class="sub-header">
        <div class="sub-header-title">基本信息</div>
      </div>
      <el-form label-position="top" label-width="80px" size="mini">
        <el-form-item label="广告名称">
          <el-input v-model="advertise.name"></el-input>
        </el-form-item>
        <el-form-item label="slug">
          <el-input v-model="advertise.slug"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="尺寸：宽">
              <el-input v-model.number="advertise.width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="尺寸：高">
              <el-input v-model.number="advertise.height"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="medium" type="primary" plain @click="handleSubmit"
          >创建广告</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import serviceAdvertise from "@/globals/service/advertise.js";

export default {
  data() {
    return {
      fileList: [],
      advertise: {
        name: "",
        slug: "",
        width: null,
        height: null
      }
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      serviceAdvertise
        .create(this.advertise)
        .then(res => {
          this.$message.success("创建广告成功");
          this.$router.push({
            name: "Advertise",
            params: {
              id: res.id
            }
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
