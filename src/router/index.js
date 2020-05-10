import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import DataStore from "@/globals/storage/index";

Vue.use(VueRouter);
const appRouter = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

// eslint-disable-next-line
appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();

  // 没有登录，重定向到登录页
  const TOKEN = DataStore.getToken();
  if (!TOKEN && to.name !== "AccountLogin") {
    next({ name: "AccountLogin", replace: true });
    return;
  }
  if (TOKEN) {
    // 已经登录并且在登录页重定向到主页
    if (to.name === "AccountLogin") {
      next({ name: "Root", replace: true });
      return;
    }
  }
  next();
});

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done();
});

export default appRouter;
