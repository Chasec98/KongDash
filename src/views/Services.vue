<template>
  <div>
  <Table title="Services" :headers="headers" :data="services" @edit="editService" @add="addService" @delete="deleteService" />
  <v-dialog width="500" v-model="serviceModalOpen">
      <ServiceModal :service="selectedService" @cancel="closeServiceModal" />
  </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import ServiceModal from "../components/services/ServiceModal";
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
    serviceModalOpen: false
  }),
  components: {
    Table,
    ServiceModal
  },
  created() {
    this.$store.dispatch("services/getServices");
  },
  computed: mapState({
    services: state => state.services.data
  }),
  methods: {
    ...mapActions('services', [
      'deleteService'
    ]),
    editService(service) {
      this.selectedService = service
      this.serviceModalOpen = true
    },
    closeServiceModal() {
      this.serviceModalOpen = false
      this.selectedService = undefined
    },
    addService() {
      this.selectedService = undefined
      this.serviceModalOpen = true
    }
  }
};
</script>
