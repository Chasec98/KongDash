import Vue from "vue";

import { upstreamsAPIModuleTypes as types } from '../../mutation-types';

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
        commit(types.SET_API_UPSTREAMS_DATA, resp.data.data);
        commit(types.SET_API_UPSTREAMS_NEXT, resp.data.next);
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
  [types.SET_API_UPSTREAMS_DATA](state, upstreams) {
    state.data = upstreams;
  },
  [types.SET_API_UPSTREAMS_NEXT](state, next) {
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
