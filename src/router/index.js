import Vue from "vue";
import VueRouter from "vue-router";
import { FrontRoutes } from "./front";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: FrontRoutes,
});

export default router;
