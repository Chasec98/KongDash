<template>
  <div>
    <Table title="Routes" :data="routes" :headers="headers" @edit="editRoute" @add="addRoute" @delete="deleteRoute"/>
    <v-dialog width="500" v-model="routeModalOpen">
      <RouteModal :route="selectedRoute" @cancel="closeRouteModal" />
  </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import RouteModal from "../components/routes/RouteModal";
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
        routeModalOpen: false
    }),
  components: {
    Table,
    RouteModal
  },
  created() {
    this.$store.dispatch("routes/getRoutes");
  },
  computed: mapState({
    routes: state => state.routes.data,
  }),
  methods: {
    ...mapActions('routes', [
      'deleteRoute'
    ]),
    closeRouteModal() {
      this.routeModalOpen = false
      this.selectedRoute = undefined
    },
    addRoute() {
      this.selectedRoute = undefined
      this.routeModalOpen = true
    },
    editRoute(route) {
      this.selectedRoute = route
      this.routeModalOpen = true
    }
  } 
};
</script>
