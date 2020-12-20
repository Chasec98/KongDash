import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getServices({ commit, dispatch }) {
    Vue.axios
      .get("/services")
      .then(resp => {
        commit("setServices", resp.data.data);
        commit("setNext", resp.data.next);
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error getting services: " + err.response.data.message,
          { root: true }
        );
      });
  },
  deleteService({ dispatch }, serviceId) {
    Vue.axios
      .delete("/services/" + serviceId)
      .then(() => {
        dispatch("getServices");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error deleting service: " + err.response.data.message,
          { root: true }
        );
      });
  },
  updateService({ dispatch }, service) {
    Vue.axios
      .put("/services/" + service.id, service)
      .then(() => {
        dispatch("getServices");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error updating service: " + err.response.data.message,
          { root: true }
        );
      });
  },
  createService({ dispatch }, service) {
    Vue.axios
      .post("/services", service)
      .then(() => {
        dispatch("getServices");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error creating service: " + err.response.data.message,
          { root: true }
        );
      });
  }
};

const mutations = {
  setServices(state, services) {
    state.data = services;
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
