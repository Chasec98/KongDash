import Vue from "vue";

import { targetsAPIModuleTypes as types } from '../../mutation-types';

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
        commit(types.SET_API_TARGETS_DATA, resp.data.data);
        commit(types.SET_API_TARGETS_NEXT, resp.data.next);
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
  [types.SET_API_TARGETS_DATA](state, targets) {
    state.data = targets;
  },
  [types.SET_API_TARGETS_NEXT](state, next) {
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
