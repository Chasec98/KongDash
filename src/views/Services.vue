<template>
  <div>
    <Table
      title="Services"
      :headers="headers"
      :data="services"
      @edit="editService"
      @add="addService"
      @delete="deleteService"
    />
    <v-dialog width="500" v-model="ServiceCardOpen">
      <ServiceCard :service="selectedService" @cancel="closeServiceCard" />
    </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import ServiceCard from "../components/services/ServiceCard";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Protocol", value: "protocol" },
      { text: "Host", value: "host" },
      { text: "Path", value: "path" },
      { text: "ID", value: "id" }
    ],
    selectedService: undefined,
    ServiceCardOpen: false
  }),
  components: {
    Table,
    ServiceCard
  },
  created() {
    this.$store.dispatch("services/getServices");
  },
  computed: mapState({
    services: state => state.services.data
  }),
  methods: {
    ...mapActions("services", ["deleteService"]),
    editService(service) {
      this.selectedService = service;
      this.ServiceCardOpen = true;
    },
    closeServiceCard() {
      this.ServiceCardOpen = false;
      this.selectedService = undefined;
    },
    addService() {
      this.selectedService = undefined;
      this.ServiceCardOpen = true;
    }
  }
};
</script>
