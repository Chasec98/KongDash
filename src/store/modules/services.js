import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getServices({ commit }) {
    Vue.axios.get("/services").then(resp => {
      commit("setServices", resp.data.data);
      commit("setNext", resp.data.next);
    });
  },
  deleteService({dispatch}, serviceId) {
    Vue.axios.delete("/services/" + serviceId).then(() => {
      dispatch('getServices')
    })
  },
  updateService({dispatch}, service) {
    Vue.axios.put("/services/"+ service.id, service).then(()=> {
      dispatch('getServices')
    })
  },
  createService({dispatch}, service) {
    Vue.axios.post("/services", service).then(() => {
      dispatch('getServices')
    })
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
