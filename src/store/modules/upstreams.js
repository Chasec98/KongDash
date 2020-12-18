import Vue from "vue";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getUpstreams({ commit }) {
    Vue.axios.get("/upstreams").then(resp => {
      commit("setUpstreams", resp.data.data);
      commit("setNext", resp.data.next);
    });
  },
  deleteUpstream({dispatch}, serviceId) {
    Vue.axios.delete("/upstreams/" + serviceId).then(() => {
      dispatch('getUpstreams')
    })
  }
};

const mutations = {
  setUpstreams(state, upstreams) {
    state.data = upstreams;
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
