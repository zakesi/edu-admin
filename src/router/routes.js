import BasicLayout from "@/components/BasicLayout.vue";
// import Dashboard from "../views/Dashboard.vue";
import Login from "../views/login.vue";
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

const routes = [
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
        path: "/course",
        name: "CoursesRoot",
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
      },
      {
        path: "/company",
        name: "companyRoot",
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
      },
      {
        path: "/stack",
        name: "StackRoot",
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
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      breadcrumb: {
        title: "登陆页面"
      }
    }
  }
];

export default routes;
