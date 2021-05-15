import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getTargets({ commit, dispatch }, upstreamId) {
    Vue.axios
      .get("/upstreams/" + upstreamId + "/targets")
      .then(resp => {
        commit("setRoutes", resp.data.data);
        commit("setNext", resp.data.next);
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error getting targets: " + err.response.data.message,
          { root: true }
        );
      });
  }
};

const mutations = {
  setTargets(state, targets) {
    state.data = targets;
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
