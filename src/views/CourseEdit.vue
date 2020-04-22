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
        <el-form label-position="top" size="mini" :model="course">
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="课程名称：">
                <el-input :disabled="!isEdit" v-model="course.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="副标题：">
                <el-input
                  :disabled="!isEdit"
                  v-model="course.short_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="课程提示：">
            <el-input :disabled="!isEdit" v-model="course.tips"></el-input>
          </el-form-item>
          <el-form-item label="课程描述：">
            <el-input
              type="textarea"
              :disabled="!isEdit"
              v-model="course.description"
            ></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="课程封面：">
                <el-upload
                  v-if="isEdit"
                  class="course-image-upload"
                  ref="upload"
                  action=""
                  :limit="1"
                  :file-list="fileList"
                  :before-upload="handleBeforeUpload"
                  accept="image/jpg, image/jpeg, image/png"
                >
                  <i
                    v-if="!course.image_url"
                    class="el-icon-plus el-uploader__icon"
                  ></i>
                  <img
                    v-if="course.image_url"
                    :src="course.image_url"
                    class="course-image-upload"
                  />
                </el-upload>
                <img
                  v-if="!isEdit && course.image_url"
                  :src="course.image_url"
                  class="course-image-upload"
                />
                <span v-if="!isEdit && !course.image_url">无</span>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="课程状态：">
                <el-switch
                  :disabled="!isEdit"
                  :active-value="1"
                  :inactive-value="0"
                  v-model="course.status"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :lg="12">
        <div class="sub-header">
          <div class="sub-header-title">课程章节</div>
        </div>
        <div class="chapter-container">
          <draggable
            v-model="course.chapters"
            group="chapter"
            handle=".chapter-item-draggable"
            @change="handleChapterSort"
          >
            <div
              class="chapter-item"
              v-for="(chapter, chapterIndex) in course.chapters"
              :key="chapter.id"
            >
              <div class="chapter-item-title">
                <i class="el-icon-rank chapter-item-draggable"></i>
                <span>{{ chapter.name }}</span>
                <div class="chapter-item-ctrl">
                  <el-dropdown trigger="hover" @command="handleChapter">
                    <span class="icon-ctrl">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="'1-' + chapterIndex"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item :command="'0-' + chapterIndex"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="chapter-item-section">
                <draggable
                  v-model="chapter.sections"
                  handle=".section-item-draggable"
                  group="section"
                  @change="e => handleSectionSort(e, chapterIndex)"
                >
                  <div
                    class="section-item"
                    v-for="(section, sectionIndex) in chapter.sections"
                    :key="section.id"
                  >
                    <div class="section-item-text">
                      <i class="el-icon-rank section-item-draggable"></i>
                      <span>{{ section.name }}</span>
                      <div class="section-item-ctrl">
                        <el-dropdown trigger="hover" @command="handleSection">
                          <span class="icon-ctrl">
                            <i class="el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              :command="
                                '2-' + chapterIndex + '-' + sectionIndex
                              "
                              >内容</el-dropdown-item
                            >
                            <el-dropdown-item
                              :command="
                                '1-' + chapterIndex + '-' + sectionIndex
                              "
                              >编辑</el-dropdown-item
                            >
                            <el-dropdown-item
                              :command="
                                '0-' + chapterIndex + '-' + sectionIndex
                              "
                              >删除</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                  </div>
                </draggable>
                <div
                  class="section-item"
                  @click="handleAddSection(chapterIndex)"
                >
                  <div class="section-item-create">
                    添加节
                    <i class="el-icon-circle-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </draggable>
          <div class="chapter-item-create" @click="handleAddChapter">
            添加章
            <i class="el-icon-circle-plus"></i>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-drawer
      :visible.sync="drawerVisible"
      direction="rtl"
      size="50%"
      :before-close="handleCloseDrawer"
    >
      <div class="section-content">
        <el-form label-position="top" size="mini" :model="course">
          <el-form-item label="小节名称：">
            <div class="section-title">{{ sectionInfo.name }}</div>
          </el-form-item>
          <el-form-item label="视频地址：">
            <el-input v-model="sectionInfo.video_url"></el-input>
          </el-form-item>
          <el-form-item label="课程内容：">
            <mavon-editor
              ref="md"
              class="md"
              :toolbars="markdownOption"
              v-model="sectionInfo.content"
              :subfield="false"
              @imgAdd="handleImgAdd"
            ></mavon-editor>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="handleSaveSection"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import draggable from "vuedraggable";
import qiniuService from "@/globals/service/qiniu.js";
import serviceCourse from "@/globals/service/course.js";
import serviceChapter from "@/globals/service/chapter.js";
import serviceSection from "@/globals/service/section.js";

const markdownOption = {
  bold: true, // 粗体
  mark: true, // 标记
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true // 表格
};

export default {
  data() {
    return {
      loading: true,
      markdownOption,
      isEdit: false,
      drawerVisible: false,
      fileList: [],
      course: {
        id: null,
        name: "",
        short_name: "",
        tips: "",
        description: "",
        status: 0,
        image_url: "",
        chapters: []
      },
      sectionInfo: {
        name: "",
        video_url: "",
        content: "",
        id: null
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const id = this.$route.params.id;
      serviceCourse
        .show(id)
        .then(res => {
          this.course = res.course;
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
        serviceCourse
          .edit(id, {
            ...this.course
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
        this.course.image_url = res.imageUrl;
      });
      return Promise.reject({});
    },
    handleAddChapter() {
      const course_id = Number(this.$route.params.id);
      const sort = this.course.chapters.length + 1;
      this.$prompt("请输入章节名称", "新增章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      }).then(({ value }) => {
        this.loading = true;
        serviceChapter
          .create({
            sort,
            course_id,
            name: value
          })
          .then(res => {
            this.$message.success("添加章节成功");
            this.course.chapters.push({
              id: res.id,
              name: value,
              sections: [],
              sort
            });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleAddSection(index) {
      const chapter = this.course.chapters[index];
      const sort = chapter.sections.length + 1;
      this.$prompt("请输入节名称", chapter.name, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      }).then(({ value }) => {
        this.loading = true;
        serviceSection
          .create({
            sort,
            chapter_id: chapter.id,
            name: value
          })
          .then(res => {
            this.$message.success("添加节成功");
            this.course.chapters[index].sections.push({
              id: res.id,
              name: value,
              sort
            });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleChapter(command) {
      const commandArr = command.split("-");
      const type = commandArr[0];
      const chapterIndex = commandArr[1];
      const chapter = this.course.chapters[chapterIndex];
      if (type === "1") {
        this.$prompt("请编辑章名称", "编辑章", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /\S/,
          inputErrorMessage: "输入不能为空",
          inputValue: chapter.name
        }).then(({ value }) => {
          this.loading = true;
          serviceChapter
            .edit(chapter.id, {
              name: value
            })
            .then(() => {
              this.$message.success("编辑章节成功");
              chapter.name = value;
            })
            .finally(() => {
              this.loading = false;
            });
        });
      } else {
        this.loading = true;
        this.$confirm("确认删除「" + chapter.name + "」吗？")
          .then(() => {
            return serviceChapter.destory(chapter.id);
          })
          .then(() => {
            this.course.chapters.splice(chapterIndex, 1);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleSection(command) {
      const commandArr = command.split("-");
      const type = commandArr[0];
      const chapterIndex = commandArr[1];
      const sectionIndex = commandArr[2];
      if (type === "1") {
        this.handleEditSection(chapterIndex, sectionIndex);
      } else if (type === "2") {
        this.handleOpenDrawer(chapterIndex, sectionIndex);
      } else {
        this.handleDelSection(chapterIndex, sectionIndex);
      }
    },
    handleEditSection(chapterIndex, sectionIndex) {
      const chapter = this.course.chapters[chapterIndex];
      const section = chapter.sections[sectionIndex];
      this.$prompt("请编辑节名称", chapter.name, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空",
        inputValue: section.name
      }).then(({ value }) => {
        this.loading = true;
        serviceSection
          .edit(section.id, {
            name: value
          })
          .then(() => {
            this.$message.success("编辑节成功");
            section.name = value;
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleDelSection(chapterIndex, sectionIndex) {
      const chapter = this.course.chapters[chapterIndex];
      const sectionName = chapter.sections[sectionIndex].name;
      const sectionId = chapter.sections[sectionIndex].id;
      this.$confirm("确认删除「" + sectionName + "」吗？")
        .then(() => {
          return serviceSection.destory(sectionId);
        })
        .then(() => {
          chapter.sections.splice(sectionIndex, 1);
        });
    },
    handleChapterSort() {
      const chapters = this.course.chapters.map(data => data.id);
      serviceChapter.sort({ chapters }).then(() => {
        this.$message.success("章节排序成功");
      });
    },
    handleSectionSort(e, chapterIndex) {
      if (e.added || e.moved) {
        const sections = this.course.chapters[chapterIndex].sections.map(
          data => data.id
        );
        const chapter_id = this.course.chapters[chapterIndex].id;
        serviceSection.sort({ sections, chapter_id }).then(() => {
          this.$message.success("节排序成功");
        });
      }
    },
    handleOpenDrawer(chapterIndex, sectionIndex) {
      const chapter = this.course.chapters[chapterIndex];
      const sectionName = chapter.sections[sectionIndex].name;
      const sectionId = chapter.sections[sectionIndex].id;
      this.drawerVisible = true;
      this.drawerTitle = sectionName;
      this.loading = true;
      serviceSection
        .show(sectionId)
        .then(res => {
          this.sectionInfo = res.section;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSaveSection() {
      const { id, name, video_url, content } = this.sectionInfo;
      this.loading = true;
      serviceSection
        .edit(id, {
          name,
          video_url,
          content
        })
        .then(() => {
          this.$message.success("保存成功");
          this.drawerVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCloseDrawer(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleImgAdd(pos, file) {
      qiniuService.start(file).then(res => {
        this.$refs.md.$img2Url(pos, res.imageUrl);
      });
    }
  },
  components: {
    draggable,
    mavonEditor
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
</style>
