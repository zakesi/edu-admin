import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);
const appRouter = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

// eslint-disable-next-line
appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
});

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done();
});

export default appRouter;
