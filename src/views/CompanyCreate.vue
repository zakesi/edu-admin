<template>
  <div class="page-content">
    <div class="c-650">
      <div class="sub-header">
        <div class="sub-header-title">基本信息</div>
      </div>
      <el-form label-position="top" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业全称:">
              <el-input v-model="company.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业短称:">
              <el-input v-model="company.short_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业口号:">
              <el-input v-model="company.slogan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社会编号:">
              <el-input v-model="company.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人名称:">
              <el-input v-model="company.contact_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话:">
              <el-input v-model="company.contact_phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="企业介绍：">
          <el-input type="textarea" v-model="company.introduction"></el-input>
        </el-form-item>
        <el-form-item label="企业封面：">
          <el-upload
            class="el-image-upload"
            ref="upload"
            action=""
            :limit="1"
            :file-list="fileList"
            :before-upload="handleBeforeUpload"
            accept="image/jpg, image/jpeg, image/png"
          >
            <i
              v-if="!company.image_url"
              class="el-icon-plus el-uploader__icon"
            ></i>
            <img
              v-if="company.image_url"
              :src="company.image_url"
              class="el-image-upload"
            />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" plain @click="handleSubmit"
            >创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/globals/service/qiniu.js";
import companyService from "@/globals/service/company.js";

export default {
  data() {
    return {
      fileList: [],
      company: {
        name: "",
        short_name: "",
        slogan: "",
        code: "",
        introduction: "",
        contact_name: "",
        contact_phone: "",
        image_url: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      companyService
        .create(this.company)
        .then(() => {
          this.$message.success("创建企业成功");
          this.$router.push({
            name: "Company"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleBeforeUpload(file) {
      qiniuService.start(file).then(res => {
        this.company.image_url = res.imageUrl;
      });
      return Promise.reject({});
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
.el-image-upload {
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 200px;
  max-width: 300px;

  /deep/.el-upload {
    width: 100%;
    height: 100%;
  }

  &:hover {
    border-color: #409eff;
  }

  .el-uploader__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
}
</style>
