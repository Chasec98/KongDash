<template>
  <div>
    <Table
      title="Plugins"
      :data="plugins"
      :headers="headers"
      @add="openModal"
      @edit="editPlugin"
      @delete="deletePlugin"
    />
    <v-dialog width="500" v-model="pluginsModalOpen">
          <PluginsCard v-if="!plugin" @close="closeModal"></PluginsCard>
          <Plugin v-if="plugin" @close="closePlugin" @submit="submitPlugin"></Plugin>
    </v-dialog>
  </div>
</template>
<script>
import { PluginsCard, Plugin } from '../components/plugins';
import Table from "../components/Table";

import { mapState, mapActions, mapMutations } from "vuex";
import { consumerModuleTypes } from '../store/mutation-types';

const dot = require('dot-object');

export default {
  components: {
    PluginsCard,
    Plugin,
    Table
  },
  created() {
    this.$store.dispatch("plugins/getPlugins");
  },
  computed: mapState({
    plugins: state => state.plugins.data,
    plugin: state => state.consumers.selectedPlugin
  }),
  data: () => ({
    pluginsModalOpen: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Consumer", value: "consumer" },
      { text: "Service", value: "service" },
      { text: "Route", value: "route" },
      { text: "ID", value: "id" }
    ],
  }),
  methods: {
    closeModal(){
      this.pluginsModalOpen = false;
      this.setPlugin(null);
    },
    closePlugin() {
      this.setPlugin(null);
    },
    openModal() {
      this.pluginsModalOpen = true;
    },
    editPlugin(plugin){
      this.setPlugin(plugin);
      this.pluginsModalOpen = true;
    },
    submitPlugin(plugin) {
      const apiPlugin = this.convertToAPIPlugin(plugin);
      this.createPlugin(apiPlugin);
      this.setPlugin(null);
    },
    convertToAPIPlugin(plugin) {
      let r = {}
      plugin.parameters.forEach(p => {
          if (p.type === "Number") {
              p.value = Number(p.value)
          }
          dot.str(p.name, p.value, r)
      })
      return r
    },
    ...mapActions("plugins", ["deletePlugin", "createPlugin", "updatePlugin"]),
    ...mapMutations("consumers", {
        setPlugin: consumerModuleTypes.SET_SELECTED_CONSUMER_PLUGIN,
    }),
  }
};
</script>
