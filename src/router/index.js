import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard";
import Services from "../views/Services";
import Routes from "../views/Routes";
import Plugins from "../views/Plugins";
import Upstreams from "../views/Upstreams";
import Consumers from "../views/Consumers";
import Login from "../views/Login";
import Certificates from "../views/Certificates";

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
    path: "/consumers",
    name: "Consumers",
    component: Consumers
  },
  {
    path: "/routes",
    name: "Routes",
    component: Routes
  },
  {
    path: "/plugins",
    name: "Plugins",
    component: Plugins
  },
  {
    path: "/upstreams",
    name: "Upstreams",
    component: Upstreams
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/certificates",
    name: "Certificates",
    component: Certificates
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
