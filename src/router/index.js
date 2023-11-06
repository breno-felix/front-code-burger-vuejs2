import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  to.name === "login" ||
  to.name === "registration" ||
  localStorage.getItem("token")
    ? next()
    : next({ name: "login" });
};

import authRoutes from "./auth";
import userRoutes from "./user";
import appRoutes from "./app";

const routes = [...authRoutes, ...userRoutes, ...appRoutes];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: 'link-active',
  routes,
});

router.beforeEach(requireAuth);

export default router;
