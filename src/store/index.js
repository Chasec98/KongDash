import Vue from "vue";
import Vuex from "vuex";

import { snackbar, consumers } from "./modules";
import {
  snis,
  consumers as apiConsumers,
  certificates,
  upstreams,
  plugins,
  targets,
  routes,
  services
} from "./modules/api";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    services,
    routes,
    plugins,
    upstreams,
    certificates,
    targets,
    consumers,
    apiConsumers,
    snackbar,
    snis
  }
});
