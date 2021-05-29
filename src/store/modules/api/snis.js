import Vue from "vue";

import { snisAPIModuleTypes as types } from "../../mutation-types";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getSNIs({ commit, dispatch }) {
    Vue.axios
      .get("/snis")
      .then(resp => {
        commit(types.SET_API_SNIS_DATA, resp.data.data);
        commit(types.SET_API_SNIS_NEXT, resp.data.next);
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error getting snis: " + err.response.data.message,
          { root: true }
        );
      });
  },
  deleteSNI({ dispatch }, sniId) {
    Vue.axios
      .delete("/snis/" + sniId)
      .then(() => {
        dispatch("getSNIs");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error deleting sni: " + err.response.data.message,
          { root: true }
        );
      });
  },
  updateSNI({ dispatch }, sni) {
    Vue.axios
      .put("/snis/" + sni.id, sni)
      .then(() => {
        dispatch("getSNIs");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error updating sni: " + err.response.data.message,
          { root: true }
        );
      });
  },
  createSNI({ dispatch }, sni) {
    Vue.axios
      .post("/snis", sni)
      .then(() => {
        dispatch("getSNIs");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error creating sni: " + err.response.data.message,
          { root: true }
        );
      });
  }
};

const mutations = {
  [types.SET_API_SNIS_DATA](state, snis) {
    state.data = snis;
  },
  [types.SET_API_SNIS_NEXT](state, next) {
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
