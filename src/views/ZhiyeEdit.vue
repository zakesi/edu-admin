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
              @click="handleZhiyeEdit"
            >
              {{ !isEdit ? "修改" : "保存" }}
            </el-button>
          </div>
        </div>
        <el-form label-position="top" size="mini" :model="zhiye">
          <el-form-item label="课程名称：">
            <el-input :disabled="!isEdit" v-model="zhiye.name"></el-input>
          </el-form-item>
          <el-form-item label="课程描述：">
            <el-input
              type="textarea"
              :disabled="!isEdit"
              v-model="zhiye.description"
            ></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="课程封面：">
                <el-upload
                  v-if="isEdit"
                  class="el-image-upload"
                  ref="upload"
                  action=""
                  :limit="1"
                  :file-list="fileList"
                  :before-upload="handleBeforeUpload"
                  accept="image/jpg, image/jpeg, image/png"
                >
                  <i
                    v-if="!zhiye.image_url"
                    class="el-icon-plus el-uploader__icon"
                  ></i>
                  <img
                    v-if="zhiye.image_url"
                    :src="zhiye.image_url"
                    class="el-image-upload"
                  />
                </el-upload>
                <img
                  v-if="!isEdit && zhiye.image_url"
                  :src="zhiye.image_url"
                  class="el-image-upload"
                />
                <span v-if="!isEdit && !zhiye.image_url">无</span>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="课程状态：">
                <el-switch
                  :disabled="!isEdit"
                  :active-value="1"
                  :inactive-value="0"
                  v-model="zhiye.status"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :lg="12">
        <div class="sub-header">
          <div class="sub-header-title">职业路径</div>
        </div>
        <div class="path-container">
          <draggable
            v-model="paths"
            group="path"
            handle=".path-item-draggable"
            @change="handleSortPath"
          >
            <div
              class="path-item"
              v-for="(path, pathIndex) in paths"
              :key="path.id"
            >
              <div class="path-item-title">
                <i class="el-icon-rank path-item-draggable"></i>
                <span>{{ path.name }}</span>
                <div class="path-item-ctrl">
                  <el-dropdown trigger="hover" @command="handleCommandPath">
                    <span class="icon-ctrl">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="'1-' + pathIndex"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item :command="'0-' + pathIndex"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="path-item-course">
                <draggable
                  v-model="path.courses"
                  handle=".course-item-draggable"
                  group="course"
                  @change="e => handleSortCourse(e, pathIndex)"
                >
                  <div
                    class="course-item"
                    v-for="(course, courseIndex) in path.courses"
                    :key="courseIndex"
                  >
                    <div class="course-item-text">
                      <i class="el-icon-rank course-item-draggable"></i>
                      <span>{{ course.name }}</span>
                      <div class="course-item-ctrl">
                        <el-dropdown
                          trigger="hover"
                          @command="handleCommandCourse"
                        >
                          <span class="icon-ctrl">
                            <i class="el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              :command="'0-' + pathIndex + '-' + courseIndex"
                              >删除</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                  </div>
                </draggable>
                <div class="course-item" @click="handleAddCourse(pathIndex)">
                  <div class="course-item-create">
                    添加关联课程
                    <i class="el-icon-circle-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </draggable>
          <div class="path-item-create" @click="handletoCreatePath">
            添加路径
            <i class="el-icon-circle-plus"></i>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :title="dialogFormType === 'create' ? '添加职业路径' : '修改职业路径'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="dialogForm">
        <el-form-item label="路径名称">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="路径描述">
          <el-input v-model="dialogForm.description" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePathSubimt">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import qiniuService from "@/globals/service/qiniu.js";
import zhiyeService from "@/globals/service/zhiye.js";

export default {
  data() {
    return {
      loading: true,
      isEdit: false,
      dialogFormType: "create",
      dialogFormVisible: false,
      dialogForm: {
        id: null,
        name: "",
        description: "",
        pathIndex: null
      },
      drawerVisible: false,
      fileList: [],
      zhiye: {
        id: null,
        name: "",
        description: "",
        status: 0,
        image_url: ""
      },
      paths: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const id = this.$route.params.id;
      zhiyeService
        .show(id)
        .then(res => {
          this.zhiye = res.zhiye;
          this.paths = res.zhiye.zhiye_paths;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleZhiyeEdit() {
      const id = this.$route.params.id;
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        this.loading = true;
        zhiyeService
          .edit(id, {
            ...this.zhiye
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
        this.zhiye.image_url = res.imageUrl;
      });
      return Promise.reject({});
    },
    handletoCreatePath() {
      this.dialogFormType = "create";
      this.dialogFormVisible = true;
      this.dialogForm.id = "";
      this.dialogForm.name = "";
      this.dialogForm.description = "";
      this.dialogForm.pathIndex = "";
    },
    handlePathSubimt() {
      if (this.dialogFormType === "create") {
        this.handleCreatePath();
      } else {
        this.handleEditPath();
      }
    },
    handleCreatePath() {
      const zhiye_id = Number(this.$route.params.id);
      const sort = this.paths.length + 1;
      const name = this.dialogForm.name;
      const description = this.dialogForm.description;
      this.loading = true;
      zhiyeService
        .createPath({
          sort,
          zhiye_id,
          name,
          description
        })
        .then(res => {
          this.$message.success("添加路径成功");
          this.paths.push({
            id: res.id,
            name,
            description,
            sort,
            courses: []
          });
        })
        .finally(() => {
          this.loading = false;
          this.dialogFormVisible = false;
        });
    },
    handleEditPath() {
      const zhiye_id = Number(this.$route.params.id);
      const id = this.dialogForm.id;
      const name = this.dialogForm.name;
      const description = this.dialogForm.description;
      const pathIndex = this.dialogForm.pathIndex;
      this.loading = true;
      zhiyeService
        .editPath(id, {
          zhiye_id,
          name,
          description
        })
        .then(() => {
          this.$message.success("编辑成功");
          this.paths[pathIndex].name = name;
          this.paths[pathIndex].description = description;
        })
        .finally(() => {
          this.loading = false;
          this.dialogFormVisible = false;
        });
    },
    handleDestoryPath(pathIndex) {
      const path = this.paths[pathIndex];
      this.loading = true;
      this.$confirm("确认删除「" + path.name + "」吗？")
        .then(() => {
          return zhiyeService.destoryPath(path.id);
        })
        .then(() => {
          this.paths.splice(pathIndex, 1);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCommandPath(command) {
      const commandArr = command.split("-");
      const type = commandArr[0];
      const pathIndex = commandArr[1];
      const path = this.paths[pathIndex];
      if (type === "1") {
        this.dialogFormType = "edit";
        this.dialogFormVisible = true;
        this.dialogForm.name = path.name;
        this.dialogForm.description = path.description;
        this.dialogForm.id = path.id;
        this.dialogForm.pathIndex = pathIndex;
      } else {
        this.handleDestoryPath(pathIndex);
      }
    },
    handleSortPath() {
      const paths = this.paths.map(data => data.id);
      zhiyeService.sortPath({ paths }).then(() => {
        this.$message.success("路径排序成功");
      });
    },
    handleSortCourse(e, pathIndex) {
      if (e.added || e.moved) {
        const courses = this.paths[pathIndex].courses.map(
          data => data.zhiye_course.id
        );
        const path_id = this.paths[pathIndex].id;
        zhiyeService.sortCourse({ courses, path_id }).then(() => {
          this.$message.success("关联课程排序成功");
        });
      }
    },
    handleImgAdd(pos, file) {
      qiniuService.start(file).then(res => {
        this.$refs.md.$img2Url(pos, res.imageUrl);
      });
    },
    handleAddCourse(pathIndex) {
      const path_id = this.paths[pathIndex].id;
      const zhiye_id = Number(this.$route.params.id);
      const sort = this.paths[pathIndex].courses.length + 1;
      this.$prompt("请输入课程 ID", "关联课程", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$/,
        inputErrorMessage: "输入课程 ID，课程 ID 为数字"
      }).then(({ value }) => {
        this.loading = true;
        zhiyeService
          .createCourse({
            path_id,
            zhiye_id,
            sort,
            course_id: Number(value)
          })
          .then(() => {
            this.$message.success("添加课程成功");
            this.getData();
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleCommandCourse(command) {
      const commandArr = command.split("-");
      const type = Number(commandArr[0]);
      const pathIndex = commandArr[1];
      const courseIndex = commandArr[2];
      const path = this.paths[pathIndex];
      const course = path.courses[courseIndex];
      const zhiyeCourseId = course.zhiye_course.id;
      if (!type) {
        this.loading = true;
        this.$confirm("确认删除「" + course.name + "」吗？")
          .then(() => {
            return zhiyeService.destoryCourse(zhiyeCourseId);
          })
          .then(() => {
            this.paths[pathIndex].courses.splice(courseIndex, 1);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  },
  components: {
    draggable
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
.path-container {
  padding: 16px;
  background-color: #f5f6f7;
}
.path-item {
  position: relative;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);

  .path-item-title {
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

    .path-item-ctrl {
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
    }

    &:hover {
      .path-item-draggable {
        display: block;
      }
    }

    .path-item-draggable {
      position: absolute;
      top: 8px;
      left: 4px;
      color: #666;
      font-size: 12px;
      display: none;
    }
  }
}
.path-item-create {
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

.course-item {
  padding: 12px 60px;
  padding-right: 20px;
  &:hover {
    background-color: rgba(51, 112, 255, 0.04);
    .course-item-draggable {
      display: block;
    }
  }
  .course-item-text {
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
    .course-item-ctrl {
      position: absolute;
      top: 50%;
      right: 4px;
      transform: translateY(-50%);
    }
  }
  .course-item-draggable {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -24px;
    color: #666;
    font-size: 12px;
    display: none;
  }
}
.course-item-create {
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

.el-image-upload {
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

.course-content {
  padding: 40px;
  padding-top: 0;
}
</style>
