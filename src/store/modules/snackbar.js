const state = () => ({
  message: "",
  open: false
});

const getters = {};

const actions = {
  addMessage({ commit }, message) {
    commit("addMessage", message);
    commit("openSnackbar");
  },
  close({ commit }) {
    commit("closeSnackbar");
    commit("clearMessages");
  }
};

const mutations = {
  addMessage(state, message) {
    state.message = message;
  },
  clearMessages(state) {
    state.messages = [];
  },
  closeSnackbar(state) {
    state.open = false;
  },
  openSnackbar(state) {
    state.open = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
