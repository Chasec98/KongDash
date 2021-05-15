import Vue from "vue";

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
        commit("setSNIs", resp.data.data);
        commit("setNext", resp.data.next);
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
  setSNIs(state, snis) {
    state.data = snis;
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
