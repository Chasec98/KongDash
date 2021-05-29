<template>
  <div>
    <Table
      title="Routes"
      :data="routes"
      :headers="headers"
      @edit="editRoute"
      @add="addRoute"
      @delete="deleteRoute"
    />
    <v-dialog width="500" v-model="RouteCardOpen">
      <RouteCard :route="selectedRoute" @cancel="closeRouteCard" />
    </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import RouteCard from "../components/routes/RouteCard";

import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Protocols", value: "protocols" },
      { text: "Methods", value: "methods" },
      { text: "Hosts", value: "hosts" },
      { text: "Paths", value: "paths" },
      { text: "ID", value: "id" }
    ],
    selectedRoute: undefined,
    RouteCardOpen: false
  }),
  components: {
    Table,
    RouteCard
  },
  created() {
    this.$store.dispatch("routes/getRoutes");
  },
  computed: mapState({
    routes: state => state.routes.data
  }),
  methods: {
    ...mapActions("routes", ["deleteRoute"]),
    closeRouteCard() {
      this.RouteCardOpen = false;
      this.selectedRoute = undefined;
    },
    addRoute() {
      this.selectedRoute = undefined;
      this.RouteCardOpen = true;
    },
    editRoute(route) {
      this.selectedRoute = route;
      this.RouteCardOpen = true;
    }
  }
};
</script>
