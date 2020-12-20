import Vue from "vue";
import Vuex from "vuex";
import snackbar from "./modules/snackbar";
import services from "./modules/services";
import routes from "./modules/routes";
import plugins from "./modules/plugins";
import upstreams from "./modules/upstreams";
import certificates from "./modules/certificates";
import targets from "./modules/targets";
import consumers from "./modules/consumers";

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
    snackbar
  }
});
