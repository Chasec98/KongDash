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
          <Plugins @close="closeModal" :plugin="plugin"></Plugins>
    </v-dialog>
  </div>
</template>
<script>
import Plugins from "../components/plugins/Plugins";
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Plugins,
    Table
  },
  created() {
    this.$store.dispatch("plugins/getPlugins");
  },
  computed: mapState({
    plugins: state => state.plugins.data
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
    plugin: {}
  }),
  methods: {
    closeModal(){
      this.plugin = {}
      this.pluginsModalOpen = false;
    },
    openModal() {
      this.pluginsModalOpen = true;
    },
    editPlugin(plugin){
      this.plugin = plugin;
      this.pluginsModalOpen = true;
    },
    ...mapActions("plugins", ["deletePlugin"])
  }
};
</script>
