<template>
  <div class="page-content" v-loading="loading">
    <div class="c-650">
      <div class="sub-header">
        <div class="sub-header-title">基本信息</div>
        <div class="sub-header-fd">
          <el-button
            size="medium"
            :type="!isEdit ? '' : 'primary'"
            @click="handleEdit"
          >
            {{ !isEdit ? "修改" : "保存" }}
          </el-button>
        </div>
      </div>
      <el-form label-position="top" label-width="80px" size="mini">
        <el-form-item label="物料名称">
          <el-input
            :disabled="!isEdit"
            v-model="material.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input
            :disabled="!isEdit"
            v-model="material.jump_url"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="打开窗口" prop="target">
          <el-select
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
      loading: true,
      isEdit: false,
      drawerVisible: false,
      fileList: [],
      material: {
        id: null,
        name: "",
        jump_url: "",
        target: "",
        upload_file: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const id = this.$route.params.id;
      serviceMaterial
        .show(id)
        .then(res => {
          this.material = res.material;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleEdit() {
      const id = this.$route.params.id;
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        this.loading = true;
        serviceMaterial
          .edit(id, {
            ...this.material
          })
          .then(() => {
            this.$message.success("编辑成功");
          })
          .finally(() => {
            this.loading = false;
          });
      }
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
