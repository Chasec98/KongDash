import { consumerModuleTypes as types } from '../mutation-types';

const state = () => ({
    selectedPlugin: null,
})

const getters = {};

const actions = {};

const mutations = {
    [types.SET_SELECTED_CONSUMER_PLUGIN](state, consumerPlugin) {
        state.selectedPlugin = consumerPlugin;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};