import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getPlugins({ commit }) {
    Vue.axios.get("/plugins").then(resp => {
      commit("setPlugins", resp.data.data);
      commit("setNext", resp.data.next);
    });
  },
  deletePlugin({ dispatch }, pluginId) {
    Vue.axios.delete("/plugins/" + pluginId).then(() => {
      dispatch("getPlugins");
    });
  },
  createPlugin({ dispatch }, plugin) {
    Vue.axios.post("/plugins", plugin).then(() => {
      dispatch("getPlugins");
    });
  },
  editPlugin({ dispatch }, plugin) {
    Vue.axios.put("/plugins/" + plugin.id, plugin).then(() => {
      dispatch("getPlugins");
    });
  }
};

const mutations = {
  setPlugins(state, plugins) {
    state.data = plugins;
  },
  setNext(state, next) {
    state.next = next;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
