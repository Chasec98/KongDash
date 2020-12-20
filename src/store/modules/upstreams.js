import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getUpstreams({ commit, dispatch }) {
    Vue.axios
      .get("/upstreams")
      .then(resp => {
        commit("setUpstreams", resp.data.data);
        commit("setNext", resp.data.next);
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error getting upstreams: " + err.response.data.message,
          { root: true }
        );
      });
  },
  deleteUpstream({ dispatch }, serviceId) {
    Vue.axios
      .delete("/upstreams/" + serviceId)
      .then(() => {
        dispatch("getUpstreams");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error deleting upstream: " + err.response.data.message,
          { root: true }
        );
      });
  },
  updateUpstream({ dispatch }, upstream) {
    Vue.axios
      .put("/upstreams/" + upstream.id, upstream)
      .then(() => {
        dispatch("getUpstreams");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error updating upstream: " + err.response.data.message,
          { root: true }
        );
      });
  },
  createUpstream({ dispatch }, upstream) {
    Vue.axios
      .post("/upstreams", upstream)
      .then(() => {
        dispatch("getUpstreams");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error creating upstream: " + err.response.data.message,
          { root: true }
        );
      });
  }
};

const mutations = {
  setUpstreams(state, upstreams) {
    state.data = upstreams;
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
