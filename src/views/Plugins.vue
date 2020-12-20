<template>
  <div>
    <Table
      title="Plugins"
      :data="routes"
      :headers="headers"
      @delete="deletePlugin"
    />
  </div>
</template>
<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Consumer", value: "consumer" },
      { text: "Service", value: "service" },
      { text: "Route", value: "route" },
      { text: "ID", value: "id" }
    ]
  }),
  components: {
    Table
  },
  created() {
    this.$store.dispatch("plugins/getPlugins");
  },
  computed: mapState({
    routes: state => state.plugins.data
  }),
  methods: mapActions("plugins", ["deletePlugin"])
};
</script>
