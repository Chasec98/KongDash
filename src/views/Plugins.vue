<template>
  <div>
    <Table
      title="Plugins"
      :data="routes"
      :headers="headers"
      @delete="deletePlugin"
      @add="addSelectPluginModalOpen"
    />
    <v-dialog width="500" v-model="selectPluginModalOpen">
      <SelectPluginModal @cancel="closeSelectPluginModalOpen" @selectPlugin="openPluginModal" />
    </v-dialog>
    <v-dialog width="500" v-model="sessionModalOpen">
      <SessionPlugin v-if="sessionModalOpen" @cancel="sessionModalOpen = false" />
    </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import SelectPluginModal from "../components/plugins/SelectPluginModal"
import SessionPlugin from "../components/plugins/SessionPlugin"
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Consumer", value: "consumer" },
      { text: "Service", value: "service" },
      { text: "Route", value: "route" },
      { text: "ID", value: "id" }
    ],
    selectPluginModalOpen: false,
    sessionModalOpen: false,
  }),
  components: {
    Table,
    SelectPluginModal,
    SessionPlugin
  },
  created() {
    this.$store.dispatch("plugins/getPlugins");
  },
  computed: mapState({
    routes: state => state.plugins.data
  }),
  methods: {
    ...mapActions("plugins", ["deletePlugin"]),
    closeSelectPluginModalOpen() {
      this.selectPluginModalOpen = false;
    },
    addSelectPluginModalOpen() {
      this.selectPluginModalOpen = true;
    },
    openPluginModal(plugin) {
      if (plugin.value === "session") {
        this.sessionModalOpen = true;
      }
    }
  }
};
</script>
