import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getConsumers({ commit }) {
    Vue.axios.get("/consumers").then(resp => {
      commit("setConsumers", resp.data.data);
      commit("setNext", resp.data.next);
    });
  },
  deleteConsumer({ dispatch }, consumerId) {
    Vue.axios.delete("/consumers/" + consumerId).then(() => {
      dispatch("getConsumers");
    });
  },
  updateConsumer({ dispatch }, consumer) {
    Vue.axios.put("/consumers/" + consumer.id, consumer).then(() => {
      dispatch("getConsumers");
    });
  },
  createConsumer({ dispatch }, consumer) {
    Vue.axios.post("/consumers", consumer).then(() => {
      dispatch("getConsumers");
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
