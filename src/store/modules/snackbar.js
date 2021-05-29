import { snackbarModuletypes as types } from '../mutation-types';

const state = () => ({
  message: "",
  show: false
});

const getters = {};

const actions = {
  addMessage({ commit }, message) {
    commit(types.SET_MESSAGE, message);
    commit(types.SET_SHOW_SNACKBAR, true);
  },
  close({ commit }) {
    commit(types.SET_SHOW_SNACKBAR, false);
    commit(types.SET_MESSAGE, null);
  }
};

const mutations = {
  [types.SET_MESSAGE](state, message) {
    state.message = message;
  },
  [types.SET_SHOW_SNACKBAR](state, show) {
    state.show = show;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
