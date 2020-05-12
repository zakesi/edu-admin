import AccountLogin from "../views/AccountLogin.vue";
import BasicLayout from "@/components/BasicLayout.vue";
import Course from "../views/Course.vue";
import Dashboard from "../views/Dashboard.vue";
import CourseCreate from "../views/CourseCreate.vue";
import CourseEdit from "../views/CourseEdit.vue";
import Zhiye from "../views/Zhiye.vue";
import ZhiyeCreate from "../views/ZhiyeCreate.vue";
import ZhiyeEdit from "../views/ZhiyeEdit.vue";
import Company from "../views/Company.vue";
import CompanyCreate from "../views/CompanyCreate.vue";
import CompanyEdit from "../views/CompanyEdit.vue";
import Project from "../views/Project.vue";
import ProjectItem from "../views/ProjectItem.vue";
import ProjectCreate from "../views/ProjectCreate.vue";
import ProjectEdit from "../views/ProjectEdit.vue";
import Stack from "../views/Stack.vue";
import StackCreate from "../views/StackCreate.vue";
import StackEdit from "../views/StackEdit.vue";
import SkillQuestion from "../views/SkillQuestion.vue";
import SkillQuestionCreate from "../views/SkillQuestionCreate.vue";
import SkillQuestionEdit from "../views/SkillQuestionEdit.vue";

import SettingRoles from "../views/SettingRoles.vue";
import SettingRoleEdit from "../views/SettingRoleEdit.vue";
import SettingRoleCreate from "../views/SettingRoleCreate.vue";

import SettingManager from "../views/SettingManager.vue";
import SettingManagerCreate from "../views/SettingManagerCreate.vue";
import SettingManagerEdit from "../views/SettingManagerEdit.vue";

const routes = [
  {
    path: "/login",
    name: "AccountLogin",
    component: AccountLogin
  },
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          }
        }
      },
      {
        path: "course/manager",
        name: "CourseManager",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection",
            title: "职业课程"
          }
        },
        children: [
          {
            path: "/course",
            name: "CoursesRoot",
            permission: "course.index",
            component: { render: h => h("router-view") },
            redirect: { name: "Course" },
            meta: {
              nav: {
                icon: "el-icon-collection",
                title: "课程管理"
              },
              breadcrumb: {
                title: "课程",
                replace: true
              }
            },
            children: [
              {
                path: "/course",
                name: "Course",
                component: Course
              },
              {
                path: "/course/create",
                name: "CourseCreate",
                component: CourseCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/course/:id/edit",
                name: "CourseEdit",
                component: CourseEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/zhiye",
            name: "zhiyesRoot",
            permission: "zhiye.index",
            component: { render: h => h("router-view") },
            redirect: { name: "Zhiye" },
            meta: {
              nav: {
                icon: "el-icon-collection",
                title: "职业路径"
              },
              breadcrumb: {
                title: "职业",
                replace: true
              }
            },
            children: [
              {
                path: "/zhiye",
                name: "Zhiye",
                component: Zhiye
              },
              {
                path: "/zhiye/create",
                name: "ZhiyeCreate",
                component: ZhiyeCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/zhiye/:id/edit",
                name: "ZhiyeEdit",
                component: ZhiyeEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "project/manager",
        name: "ProjectManager",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection",
            title: "企业项目"
          }
        },
        children: [
          {
            path: "/company",
            name: "companyRoot",
            permission: "company.index",
            component: { render: h => h("router-view") },
            redirect: { name: "Company" },
            meta: {
              nav: {
                icon: "el-icon-collection",
                title: "企业管理"
              },
              breadcrumb: {
                title: "企业",
                replace: true
              }
            },
            children: [
              {
                path: "/company",
                name: "Company",
                component: Company
              },
              {
                path: "/company/create",
                name: "CompanyCreate",
                component: CompanyCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/company/:id/edit",
                name: "CompanyEdit",
                component: CompanyEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/project",
            name: "ProjectRoot",
            permission: "project.index",
            component: { render: h => h("router-view") },
            redirect: { name: "Project" },
            meta: {
              nav: {
                icon: "el-icon-collection",
                title: "项目管理"
              },
              breadcrumb: {
                title: "项目",
                replace: true
              }
            },
            children: [
              {
                path: "/project",
                name: "Project",
                component: Project
              },
              {
                path: "/project/create",
                name: "ProjectCreate",
                component: ProjectCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/project/:id",
                name: "ProjectItem",
                component: ProjectItem,
                meta: {
                  breadcrumb: {
                    title: "详情"
                  }
                }
              },
              {
                path: "/project/:id/edit",
                name: "ProjectEdit",
                component: ProjectEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/skill/manager",
        name: "SkillManager",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection",
            title: "技能测评"
          }
        },
        children: [
          {
            path: "/stack",
            name: "StackRoot",
            permission: "stack.index",
            component: { render: h => h("router-view") },
            redirect: { name: "Stack" },
            meta: {
              nav: {
                icon: "el-icon-collection",
                title: "技能管理"
              },
              breadcrumb: {
                title: "技能",
                replace: true
              }
            },
            children: [
              {
                path: "/stack",
                name: "Stack",
                component: Stack
              },
              {
                path: "/stack/create",
                name: "StackCreate",
                component: StackCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/stack/:id/edit",
                name: "StackEdit",
                component: StackEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/skill/question",
            name: "SkillQuestionRoot",
            permission: "skill.index",
            component: { render: h => h("router-view") },
            redirect: { name: "SkillQuestion" },
            meta: {
              nav: {
                icon: "el-icon-collection",
                title: "题库管理"
              },
              breadcrumb: {
                title: "题库",
                replace: true
              }
            },
            children: [
              {
                path: "/skill/question",
                name: "SkillQuestion",
                component: SkillQuestion
              },
              {
                path: "/skill/question/create",
                name: "SkillQuestionCreate",
                component: SkillQuestionCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/skill/question/:id/edit",
                name: "SkillQuestionEdit",
                component: SkillQuestionEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/setting",
        name: "settingRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "管理设置"
          },
          breadcrumb: {
            title: "设置"
          }
        },
        children: [
          {
            path: "/setting/manager",
            name: "SettingManagerRoot",
            // permission: "setting-manager",
            component: { render: h => h("router-view") },
            redirect: { name: "SettingManager" },
            meta: {
              nav: {
                icon: "el-icon-user",
                title: "管理员"
              },
              breadcrumb: {
                title: "管理员",
                replace: true
              }
            },
            children: [
              {
                path: "/setting/manager",
                name: "SettingManager",
                component: SettingManager
              },
              {
                path: "/setting/manager/create",
                name: "SettingManagerCreate",
                component: SettingManagerCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/setting/manager/:id/edit",
                name: "SettingManagerEdit",
                component: SettingManagerEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/setting/roles",
            name: "SettingRolesRoot",
            component: { render: h => h("router-view") },
            redirect: { name: "Roles" },
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "角色"
              },
              breadcrumb: {
                title: "角色"
              }
            },
            children: [
              {
                path: "/setting/roles",
                name: "SettingRoles",
                component: SettingRoles
              },
              {
                path: "/setting/roles/create",
                name: "SettingRoleCreate",
                component: SettingRoleCreate
              },
              {
                path: "/setting/roles/:id",
                name: "SettingRoleEdit",
                component: SettingRoleEdit,
                meta: {
                  breadcrumb: {
                    title: "详情"
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },
];

export default routes;
