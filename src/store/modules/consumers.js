import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getConsumers({ commit, dispatch }) {
    Vue.axios
      .get("/consumers")
      .then(resp => {
        commit("setConsumers", resp.data.data);
        commit("setNext", resp.data.next);
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error getting consumers: " + err.response.data.message,
          { root: true }
        );
      });
  },
  deleteConsumer({ dispatch }, consumerId) {
    Vue.axios
      .delete("/consumers/" + consumerId)
      .then(() => {
        dispatch("getConsumers");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error deleting consumer: " + err.response.data.message,
          { root: true }
        );
      });
  },
  updateConsumer({ dispatch }, consumer) {
    Vue.axios
      .put("/consumers/" + consumer.id, consumer)
      .then(() => {
        dispatch("getConsumers");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error updating consumer: " + err.response.data.message,
          { root: true }
        );
      });
  },
  createConsumer({ dispatch }, consumer) {
    Vue.axios
      .post("/consumers", consumer)
      .then(() => {
        dispatch("getConsumers");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error creating consumer: " + err.response.data.message,
          { root: true }
        );
      });
  }
};

const mutations = {
  setConsumers(state, consumers) {
    state.data = consumers;
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
