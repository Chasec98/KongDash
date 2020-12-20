import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getCertificates({ commit }) {
    Vue.axios.get("/certificates").then(resp => {
      commit("setCertificates", resp.data.data);
      commit("setNext", resp.data.next);
    });
  },
  deleteCertificate({ dispatch }, certificateId) {
    Vue.axios.delete("/certificates/" + certificateId).then(() => {
      dispatch("getCertificates");
    });
  }
};

const mutations = {
  setCertificates(state, certificates) {
    state.data = certificates;
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
