import Vue from "vue";

import { routesAPIModuleTypes as types } from "../../mutation-types";

const state = () => ({
  data: [],
  next: ""
});

const getters = {};

const actions = {
  getRoutes({ commit, dispatch }) {
    Vue.axios
      .get("/routes")
      .then(resp => {
        commit(types.SET_API_ROUTES_DATA, resp.data.data);
        commit(types.SET_API_ROUTES_NEXT, resp.data.next);
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error getting routes: " + err.response.data.message,
          { root: true }
        );
      });
  },
  deleteRoute({ dispatch }, routeId) {
    Vue.axios
      .delete("/routes/" + routeId)
      .then(() => {
        dispatch("getRoutes");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error deleting route: " + err.response.data.message,
          { root: true }
        );
      });
  },
  updateRoute({ dispatch }, route) {
    Vue.axios
      .put("/routes/" + route.id, route)
      .then(() => {
        dispatch("getRoutes");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error updating route: " + err.response.data.message,
          { root: true }
        );
      });
  },
  createRoute({ dispatch }, route) {
    Vue.axios
      .post("/routes", route)
      .then(() => {
        dispatch("getRoutes");
      })
      .catch(err => {
        dispatch(
          "snackbar/addMessage",
          "Error creating route: " + err.response.data.message,
          { root: true }
        );
      });
  }
};

const mutations = {
  [types.SET_API_ROUTES_DATA](state, routes) {
    state.data = routes;
  },
  [types.SET_API_ROUTES_NEXT](state, next) {
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
