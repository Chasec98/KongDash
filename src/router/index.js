import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard"
import Services from "../views/Services"
import Routes from "../views/Routes"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/services",
    name: "Services",
    component: Services
  },
  {
    path: "/routes",
    name: "Routes",
    component: Routes
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
