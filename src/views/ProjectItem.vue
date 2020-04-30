<template>
  <div class="page-content" v-loading="loading">
    <h2 class="project-title">{{ project.name }}</h2>
    <div class="project-description">{{ project.description }}</div>
    <el-divider></el-divider>
    <el-row :gutter="40">
      <el-col :lg="8">
        <h3>版本</h3>
        <div class="version-container">
          <draggable
            v-model="versions"
            group="version"
            handle=".version-item-draggable"
            @change="handleVersionSort"
          >
            <div
              v-for="(version, versionIndex) in versions"
              :key="version.id"
              :class="[
                'version-item',
                {
                  active: versionId === version.id
                }
              ]"
              @click="handleVersionCheckout(version.id)"
            >
              <div class="version-item-title">
                <i class="el-icon-rank version-item-draggable"></i>
                <span>{{ version.name }}</span>
                <div class="version-item-ctrl">
                  <el-dropdown trigger="hover" @command="handleVersionCommand">
                    <span class="icon-ctrl">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="'1-' + versionIndex"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item :command="'0-' + versionIndex"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </draggable>
          <div class="version-item-create" @click="handleVersionCreate">
            添加版本
            <i class="el-icon-circle-plus"></i>
          </div>
        </div>
      </el-col>
      <el-col :lg="16">
        <h3>故事</h3>
        <div class="story-container" v-if="versionId">
          <draggable
            v-model="stories"
            group="story"
            handle=".story-item-draggable"
            @change="handleStorySort"
          >
            <div
              class="story-item"
              v-for="(story, storyIndex) in stories"
              :key="story.id"
            >
              <div class="story-item-title">
                <i class="el-icon-rank story-item-draggable"></i>
                <span>{{ story.name }}</span>
                <div class="story-item-ctrl">
                  <el-dropdown trigger="hover" @command="handleStoryCommand">
                    <span class="icon-ctrl">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="'1-' + storyIndex"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item :command="'0-' + storyIndex"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="story-item-task">
                <draggable
                  v-model="story.tasks"
                  handle=".task-item-draggable"
                  group="task"
                >
                  <div
                    class="task-item"
                    v-for="(task, taskIndex) in story.tasks"
                    :key="task.id"
                  >
                    <div class="task-item-text">
                      <i class="el-icon-rank task-item-draggable"></i>
                      <span>{{ task.name }}</span>
                      <div class="task-item-ctrl">
                        <el-dropdown
                          trigger="hover"
                          @command="handleTaskCommand"
                        >
                          <span class="icon-ctrl">
                            <i class="el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              :command="'1-' + storyIndex + '-' + taskIndex"
                              >内容</el-dropdown-item
                            >
                            <el-dropdown-item
                              :command="'0-' + storyIndex + '-' + taskIndex"
                              >删除</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                  </div>
                </draggable>
                <div class="task-item" @click="handleAddtask(storyIndex)">
                  <div class="task-item-create">
                    添加任务
                    <i class="el-icon-circle-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </draggable>
          <div class="story-item-create" @click="handleStoryCreate">
            添加故事
            <i class="el-icon-circle-plus"></i>
          </div>
        </div>
        <div v-if="!versionId">👈 请点击选择版本</div>
      </el-col>
    </el-row>

    <el-drawer
      :visible.sync="drawerVisible"
      direction="rtl"
      size="50%"
      :before-close="handleCloseDrawer"
    >
      <div class="task-content">
        <el-form label-position="top" size="mini" :model="task">
          <el-form-item label="任务名称：">
            <el-input v-model="task.name"></el-input>
          </el-form-item>
          <el-row :gutter="40">
            <el-col :lg="12">
              <el-form-item label="任务难度：">
                <el-select v-model="task.level" placeholder="请选择难度">
                  <el-option label="入门" :value="1"></el-option>
                  <el-option label="初级" :value="2"></el-option>
                  <el-option label="中级" :value="3"></el-option>
                  <el-option label="高级" :value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="任务平台：">
                <el-select v-model="task.platform" placeholder="请选择平台">
                  <el-option label="API" :value="1"></el-option>
                  <el-option label="前台" :value="2"></el-option>
                  <el-option label="后台" :value="3"></el-option>
                  <el-option label="小程序" :value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="课任务内容：">
            <mavon-editor
              ref="md"
              class="md"
              :toolbars="markdownOption"
              v-model="task.content"
              :subfield="false"
              @imgAdd="handleImgAdd"
            ></mavon-editor>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="handleTaskSave"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script type="text/javascript">
import draggable from "vuedraggable";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import projectService from "@/globals/service/project.js";
import qiniuService from "@/globals/service/qiniu.js";

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
  components: {
    draggable,
    mavonEditor
  },
  data() {
    return {
      markdownOption,
      loading: true,
      project: {
        name: "",
        description: ""
      },
      versionId: null,
      versions: [],
      stories: [],
      drawerVisible: false,
      taskId: null,
      task: {
        name: "",
        content: "",
        level: "",
        platform: ""
      }
    };
  },
  created() {
    this.getData();
  },
  watch: {
    versionId: function(versionId) {
      const version = this.versions.find(data => data.id === versionId);
      this.stories = version.stories;
    }
  },
  methods: {
    handleImgAdd(pos, file) {
      qiniuService.start(file).then(res => {
        this.$refs.md.$img2Url(pos, res.imageUrl);
      });
    },
    getData() {
      const id = this.$route.params.id;
      projectService
        .show(id)
        .then(res => {
          this.project = res.project;
          this.versions = res.project.versions;
          if (this.versions.length) {
            this.versionId = this.versions[0].id;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleVersionCheckout(id) {
      this.versionId = id;
    },
    handleVersionSort() {
      const versions = this.versions.map(data => data.id);
      projectService.sortVersion({ versions }).then(() => {
        this.$message.success("版本排序成功");
      });
    },
    handleVersionCreate() {
      const project_id = Number(this.$route.params.id);
      const sort = this.versions.length + 1;
      this.$prompt("请输入版本名称", "新版本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      }).then(({ value }) => {
        this.loading = true;
        projectService
          .createVersion({
            sort,
            project_id,
            name: value
          })
          .then(res => {
            this.$message.success("添加章节成功");
            this.versions.push({
              id: res.id,
              name: value,
              stories: [],
              sort
            });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleVersionCommand(command) {
      const commandArr = command.split("-");
      const type = commandArr[0];
      const versionIndex = commandArr[1];
      const version = this.versions[versionIndex];
      if (type === "1") {
        this.$prompt("请编辑章名称", "编辑章", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /\S/,
          inputErrorMessage: "输入不能为空",
          inputValue: version.name
        }).then(({ value }) => {
          this.handleVersionEdit(
            version.id,
            {
              name: value
            },
            () => {
              this.versions[versionIndex].name = value;
            }
          );
        });
      } else {
        this.handleVersionDestory(version.id, versionIndex);
      }
    },
    handleVersionEdit(id, params, successCallback) {
      this.loading = true;
      projectService
        .editVersion(id, params)
        .then(() => {
          this.$message.success("编辑版本成功");
          successCallback();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleVersionDestory(id, index) {
      this.$confirm("确认删除「" + name + "」吗？")
        .then(() => {
          this.loading = true;
          this.loading = true;
          return projectService.destoryVersion(id);
        })
        .then(() => {
          this.$message.success("版本删除成功");
          this.versions.splice(index, 1);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleStoryCreate() {
      const project_id = Number(this.$route.params.id);
      const version_id = this.versionId;
      const sort = this.stories.length + 1;
      this.$prompt("请输入故事名称", "新故事", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      }).then(({ value }) => {
        this.loading = true;
        projectService
          .createStory({
            sort,
            project_id,
            version_id,
            name: value
          })
          .then(() => {
            this.$message.success("添加故事成功");
            this.getData();
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleStorySort() {
      const stories = this.stories.map(data => data.id);
      projectService.sortStory({ stories }).then(() => {
        this.$message.success("故事排序成功");
      });
    },
    handleStoryCommand(command) {
      const commandArr = command.split("-");
      const type = commandArr[0];
      const storyIndex = commandArr[1];
      const story = this.stories[storyIndex];
      if (type === "1") {
        this.$prompt("请编辑章名称", "编辑章", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /\S/,
          inputErrorMessage: "输入不能为空",
          inputValue: story.name
        }).then(({ value }) => {
          this.handleStoryEdit(
            story.id,
            {
              name: value
            },
            () => {
              this.stories[storyIndex].name = value;
            }
          );
        });
      } else {
        this.handleStoryDestory(story.id, storyIndex);
      }
    },
    handleStoryEdit(id, params, successCallback) {
      this.loading = true;
      projectService
        .editStory(id, params)
        .then(() => {
          this.$message.success("编辑故事成功");
          successCallback();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleStoryDestory(id, index) {
      const name = this.stories[index].name;
      this.$confirm("确认删除「" + name + "」吗？")
        .then(() => {
          this.loading = true;
          return projectService.destoryStory(id);
        })
        .then(() => {
          this.$message.success("故事删除成功");
          this.stories.splice(index, 1);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleAddtask(storyIndex) {
      const project_id = Number(this.$route.params.id);
      const version_id = this.versionId;
      const story = this.stories[storyIndex];
      const story_id = story.id;
      const sort = story.tasks.length + 1;
      this.$prompt("请输入任务名称", "新任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      }).then(({ value }) => {
        this.loading = true;
        projectService
          .createTask({
            sort,
            project_id,
            version_id,
            story_id,
            name: value
          })
          .then(res => {
            this.stories[storyIndex].tasks.push({
              id: res.id,
              name: value,
              sort
            });
            this.$message.success("添加任务成功");
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleTaskCommand(command) {
      const commandArr = command.split("-");
      const type = commandArr[0];
      const storyIndex = commandArr[1];
      const taskIndex = commandArr[2];
      const story = this.stories[storyIndex];
      const taskId = story.tasks[taskIndex].id;
      if (type === "1") {
        this.handleOpenDrawer(taskId);
      } else {
        this.handleTaskDestory(taskId, storyIndex, taskIndex);
      }
    },
    handleOpenDrawer(id) {
      this.loading = true;
      projectService
        .showTask(id)
        .then(res => {
          this.drawerVisible = true;
          this.task = res.task;
          this.taskId = id;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleTaskDestory(id, storyIndex, taskIndex) {
      const name = this.stories[storyIndex].tasks[taskIndex].name;
      this.$confirm("确认删除「" + name + "」吗？")
        .then(() => {
          this.loading = true;
          return projectService.destoryTask(id);
        })
        .then(() => {
          this.$message.success("任务删除成功");
          this.stories[storyIndex].tasks.splice(taskIndex, 1);
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
    handleTaskSave() {
      const id = this.taskId;
      const params = this.task;
      this.loading = true;
      projectService
        .editTask(id, params)
        .then(() => {
          this.$message.success("保存成功");
          this.drawerVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.version-container {
  padding: 1px;
  background-color: #f5f6f7;
  .version-item {
    position: relative;
    margin-bottom: 1px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);

    &.active {
      background-color: #f5f55f;
    }

    .version-item-title {
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

      .version-item-ctrl {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
      }

      &:hover {
        .version-item-draggable {
          display: block;
        }
      }

      .version-item-draggable {
        position: absolute;
        top: 8px;
        left: 4px;
        color: #666;
        font-size: 12px;
        display: none;
      }
    }
  }
  .version-item-create {
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

.story-container {
  padding: 16px;
  background-color: #f5f6f7;
}
.story-item {
  position: relative;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);

  .story-item-title {
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

    .story-item-ctrl {
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
    }

    &:hover {
      .story-item-draggable {
        display: block;
      }
    }

    .story-item-draggable {
      position: absolute;
      top: 8px;
      left: 4px;
      color: #666;
      font-size: 12px;
      display: none;
    }
  }
  .task-item {
    padding: 12px 60px;
    padding-right: 20px;
    &:hover {
      background-color: rgba(51, 112, 255, 0.04);
      .task-item-draggable {
        display: block;
      }
    }
    .task-item-text {
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
      .task-item-ctrl {
        position: absolute;
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
      }
    }
    .task-item-draggable {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -24px;
      color: #666;
      font-size: 12px;
      display: none;
    }
  }
  .task-item-create {
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
}

.story-item-create {
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

.task-content {
  padding: 40px;
  padding-top: 0;
}
</style>
