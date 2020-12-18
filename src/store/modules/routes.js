import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getRoutes({commit}) {
    Vue.axios.get("/routes").then(resp => {
      commit("setRoutes", resp.data.data);
      commit("setNext", resp.data.next);
    });
  },
  deleteRoute({dispatch}, routeId) {
      Vue.axios.delete("/routes/" + routeId).then(() => {
        dispatch('getRoutes')
      })
  }
};

const mutations = {
  setRoutes(state, routes) {
    state.data = routes;
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
