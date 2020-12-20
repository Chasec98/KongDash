import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getPlugins({ commit, dispatch }) {
    Vue.axios.get("/plugins").then(resp => {
      commit("setPlugins", resp.data.data);
      commit("setNext", resp.data.next);
    }).catch(err => {
      dispatch(
        "snackbar/addMessage",
        "Error getting plugins: " + err.response.data.message,
        { root: true }
      );
    });
  },
  deletePlugin({ dispatch }, pluginId) {
    Vue.axios.delete("/plugins/" + pluginId).then(() => {
      dispatch("getPlugins");
    }).catch(err => {
      dispatch(
        "snackbar/addMessage",
        "Error deleting plugin: " + err.response.data.message,
        { root: true }
      );
    });;
  },
  createPlugin({ dispatch }, plugin) {
    Vue.axios.post("/plugins", plugin).then(() => {
      dispatch("getPlugins");
    }).catch(err => {
      dispatch(
        "snackbar/addMessage",
        "Error creating plugin: " + err.response.data.message,
        { root: true }
      );
    });;
  },
  editPlugin({ dispatch }, plugin) {
    Vue.axios.put("/plugins/" + plugin.id, plugin).then(() => {
      dispatch("getPlugins");
    }).catch(err => {
      dispatch(
        "snackbar/addMessage",
        "Error editing plugin: " + err.response.data.message,
        { root: true }
      );
    });;
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
