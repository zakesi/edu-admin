<template>
  <div class="page-content" v-loading="loading">
    <el-row :gutter="60">
      <el-col :lg="12">
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
        <el-form label-position="top" size="mini" :model="advertise">
          <el-form-item label="广告名称：">
            <el-input :disabled="!isEdit" v-model="advertise.name"></el-input>
          </el-form-item>
          <el-form-item label="slug：">
            <el-input :disabled="!isEdit" v-model="advertise.slug"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="尺寸：宽">
                <el-input
                  :disabled="!isEdit"
                  v-model.number="advertise.width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="尺寸：高">
                <el-input
                  :disabled="!isEdit"
                  v-model.number="advertise.height"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :lg="12">
        <div class="sub-header">
          <div class="sub-header-title">广告-物料</div>
        </div>
        <div class="material-container">
          <draggable
            v-model="advertise_materials"
            group="advertise_materials"
            handle=".material-item-draggable"
            @change="handleVersionSort"
          >
            <div
              v-for="(material, materialIndex) in advertise_materials"
              :key="material.id"
              class="material-item"
              @click="handleVersionCheckout(material.id, materialIndex)"
            >
              <div class="material-item-title">
                <i class="el-icon-rank material-item-draggable"></i>
                <span
                  >{{ material.materialInfo.id }} -
                  {{ material.materialInfo.name }}</span
                >
                <div class="material-item-ctrl">
                  <el-dropdown trigger="hover" @command="handleMaterialCommand">
                    <span class="icon-ctrl">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        :command="material.id + '-' + materialIndex"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </draggable>
          <div class="material-item-create" @click="handleMaterialCreate">
            添加物料
            <i class="el-icon-circle-plus"></i>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import "mavon-editor/dist/css/index.css";
import serviceAdvertise from "@/globals/service/advertise.js";

export default {
  components: {
    draggable
  },
  data() {
    return {
      loading: true,
      isEdit: false,
      drawerVisible: false,
      fileList: [],
      advertise: {
        id: null,
        name: "",
        slug: "",
        width: null,
        height: null
      },
      advertise_materials: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const id = this.$route.params.id;
      serviceAdvertise
        .show(id)
        .then(res => {
          this.advertise = res.advertise;
          this.advertise_materials = res.advertise_materials;
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
        serviceAdvertise
          .edit(id, {
            ...this.advertise
          })
          .then(() => {
            this.$message.success("编辑成功");
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleMaterialCreate() {
      const advertise_id = Number(this.$route.params.id);
      const sort = this.advertise_materials.length + 1;
      this.$prompt("请输入物料ID", "添加关联物料", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      }).then(({ value }) => {
        this.loading = true;

        serviceAdvertise
          .createMaterial({
            sort,
            advertise_id,
            material_id: Number(value)
          })
          .then(() => {
            this.$message.success("添加关联物料成功");
            this.getData();
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleVersionCheckout() {},
    handleMaterialCommand(command) {
      this.loading = true;
      const commandArr = command.split("-");
      const advertiseMaterialId = commandArr[0];
      const advertiseMaterialIndex = commandArr[1];
      serviceAdvertise
        .destoryMaterial(advertiseMaterialId)
        .then(() => {
          this.$message.success("删除关联物料成功");
          this.advertise_materials.splice(advertiseMaterialIndex, 1);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleVersionSort() {
      const advertise_materials = this.advertise_materials.map(data => data.id);
      serviceAdvertise.sortMaterial({ advertise_materials }).then(() => {
        this.$message.success("物料排序成功");
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
.chapter-container {
  padding: 16px;
  background-color: #f5f6f7;
}
.chapter-item {
  position: relative;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);

  .chapter-item-title {
    position: relative;
    line-height: 24px;
    font-size: 16px;
    padding: 12px 60px;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 18px;
      width: 28px;
      height: 28px;
      margin-right: 12px;
      border-radius: 50%;
      transform: translateY(-50%);
      background: url("~@/assets/icon/icon-flag.png");
      background-size: cover;
      z-index: 2;
    }

    .chapter-item-ctrl {
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
    }

    &:hover {
      .chapter-item-draggable {
        display: block;
      }
    }

    .chapter-item-draggable {
      position: absolute;
      top: 8px;
      left: 4px;
      color: #666;
      font-size: 12px;
      display: none;
    }
  }
}
.chapter-item-create {
  position: relative;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);
  text-align: right;
  cursor: pointer;
  line-height: 24px;
  font-size: 14px;
  color: #999;
  padding: 12px 20px;
  .el-icon-circle-plus {
    vertical-align: middle;
  }
}

.section-item {
  padding: 12px 60px;
  padding-right: 20px;
  &:hover {
    background-color: rgba(51, 112, 255, 0.04);
    .section-item-draggable {
      display: block;
    }
  }
  .section-item-text {
    position: relative;
    font-size: 14px;
    line-height: 22px;
    color: #373c43;
    padding-left: 24px;
    &:before {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #3370ff;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: -12px;
      height: 1px;
      background: #dee0e3;
      z-index: 2;
    }
    .section-item-ctrl {
      position: absolute;
      top: 50%;
      right: 4px;
      transform: translateY(-50%);
    }
  }
  .section-item-draggable {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -24px;
    color: #666;
    font-size: 12px;
    display: none;
  }
}
.section-item-create {
  position: relative;
  text-align: right;
  color: #999;
  cursor: pointer;
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: -12px;
    height: 1px;
    background: #dee0e3;
    z-index: 2;
  }
}

.course-image-upload {
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 200px;
  max-width: 300px;
  width: 100%;
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

.section-content {
  padding: 40px;
  padding-top: 0;
}
.material-container {
  padding: 1px;
  background-color: #f5f6f7;
  .material-item {
    position: relative;
    margin-bottom: 1px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);

    &.active {
      background-color: #f5f55f;
    }

    .material-item-title {
      position: relative;
      line-height: 24px;
      font-size: 16px;
      padding: 12px 60px;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 18px;
        width: 28px;
        height: 28px;
        margin-right: 12px;
        border-radius: 50%;
        transform: translateY(-50%);
        background: url("~@/assets/icon/icon-flag.png");
        background-size: cover;
        z-index: 2;
      }

      .material-item-ctrl {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
      }

      &:hover {
        .material-item-draggable {
          display: block;
        }
      }

      .material-item-draggable {
        position: absolute;
        top: 8px;
        left: 4px;
        color: #666;
        font-size: 12px;
        display: none;
      }
    }
  }
  .material-item-create {
    position: relative;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);
    text-align: right;
    cursor: pointer;
    line-height: 24px;
    font-size: 14px;
    color: #999;
    padding: 12px 20px;
    .el-icon-circle-plus {
      vertical-align: middle;
    }
  }
}
</style>
