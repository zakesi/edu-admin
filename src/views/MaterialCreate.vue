<template>
  <div class="page-content">
    <div class="c-650">
      <div class="sub-header">
        <div class="sub-header-title">基本信息</div>
      </div>
      <el-form label-position="top" label-width="80px" size="mini">
        <el-form-item label="物料名称">
          <el-input v-model="material.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="material.jump_url" clearable></el-input>
        </el-form-item>
        <el-form-item label="打开窗口" prop="target">
          <el-select
            v-model="material.target"
            placeholder="请选择打开窗口"
            clearable
          >
            <el-option label="原窗口" value="_self"></el-option>
            <el-option label="新窗口" value="_blank"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料图片：">
          <el-upload
            class="material-image-upload"
            ref="upload"
            action=""
            :limit="1"
            :file-list="fileList"
            :before-upload="handleBeforeUpload"
            accept="image/jpg, image/jpeg, image/png"
          >
            <i
              v-if="!material.upload_file"
              class="el-icon-plus el-uploader__icon"
            ></i>
            <img
              v-if="material.upload_file"
              :src="material.upload_file"
              class="material-image-upload"
            />
          </el-upload>
        </el-form-item>
        <el-button size="medium" type="primary" plain @click="handleSubmit"
          >创建物料</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/globals/service/qiniu.js";
import serviceMaterial from "@/globals/service/material.js";

export default {
  data() {
    return {
      fileList: [],
      material: {
        name: "",
        jump_url: "",
        target: "",
        upload_file: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      serviceMaterial
        .create(this.material)
        .then(res => {
          this.$message.success("创建物料成功");
          this.$router.push({
            name: "Material",
            params: {
              id: res.id
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleBeforeUpload(file) {
      qiniuService.start(file).then(res => {
        this.material.upload_file = res.imageUrl;
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
.material-image-upload {
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
