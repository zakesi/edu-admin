import BasicLayout from "@/components/BasicLayout.vue";
// import Dashboard from "../views/Dashboard.vue";
import Login from "../views/login.vue";
import Course from "../views/Course.vue";
import CourseCreate from "../views/CourseCreate.vue";
import CourseEdit from "../views/CourseEdit.vue";
import Zhiye from "../views/Zhiye.vue";
import ZhiyeCreate from "../views/ZhiyeCreate.vue";
import ZhiyeEdit from "../views/ZhiyeEdit.vue";

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
        // component: Dashboard,
        redirect: { name: "Course" },
        meta: {
          // nav: {
          //   icon: "el-icon-pie-chart",
          //   title: "概况"
          // },
          // breadcrumb: {
          //   title: "概况"
          // }
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
