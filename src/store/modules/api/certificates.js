import Vue from "vue";

import { certificatesAPIModuleTypes as types } from "../../mutation-types";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getCertificates({ commit, dispatch }) {
    Vue.axios
      .get("/certificates")
      .then(resp => {
        commit(types.SET_API_CERTIFICATES_DATA, resp.data.data);
        commit(types.SET_API_CERTIFICATES_NEXT, resp.data.next);
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error getting certificates: " + err.response.data.message,
          { root: true }
        );
      });
  },
  editCertificate({ dispatch }, certificate) {
    Vue.axios
      .put("/certificates/" + certificate.id, certificate)
      .then(() => {
        dispatch("getCertificates");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error editing certificate: " + err.response.data.message,
          { root: true }
        );
      });
  },
  createCertificate({ dispatch }, certificate) {
    Vue.axios
      .post("/certificates", certificate)
      .then(() => {
        dispatch("getCertificates");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error creating certificate: " + err.response.data.message,
          { root: true }
        );
      });
  },
  deleteCertificate({ dispatch }, certificateId) {
    Vue.axios
      .delete("/certificates/" + certificateId)
      .then(() => {
        dispatch("getCertificates");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error deleting certificate: " + err.response.data.message,
          { root: true }
        );
      });
  }
};

const mutations = {
  [types.SET_API_CERTIFICATES_DATA](state, certificates) {
    state.data = certificates;
  },
  [types.SET_API_CERTIFICATES_NEXT](state, next) {
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
