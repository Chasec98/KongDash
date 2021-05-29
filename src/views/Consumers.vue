<template>
  <div>
    <Table
      title="Consumers"
      :data="consumers"
      :headers="headers"
      @edit="editConsumer"
      @add="addConsumer"
      @delete="deleteConsumer"
    />
    <v-dialog width="500" v-model="ConsumerOpen">
      <ConsumerCard
        v-if="!selectedPlugin"
        :consumer="selectedConsumer"
        @cancel="closeConsumer"
      />
      <ConsumerPlugin
        v-if="selectedPlugin"
        :plugin="selectedPlugin"
      ></ConsumerPlugin>
    </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import ConsumerPlugin from "../components/consumers/ConsumerPlugin";
import ConsumerCard from "../components/consumers/ConsumerCard";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Username", value: "username" },
      { text: "Custom ID", value: "custom_id" },
      { text: "ID", value: "id" }
    ],
    selectedConsumer: undefined,
    ConsumerOpen: false,
    selectedPlugin: null
  }),
  components: {
    Table,
    ConsumerCard,
    ConsumerPlugin
  },
  created() {
    this.$store.dispatch("apiConsumers/getConsumers");
  },
  computed: mapState({
    consumers: state => state.apiConsumers.data
  }),
  methods: {
    ...mapActions("apiConsumers", ["deleteConsumer"]),
    closeConsumer() {
      this.ConsumerOpen = false;
      this.selectedConsumer = undefined;
    },
    addConsumer() {
      this.selectedConsumer = undefined;
      this.ConsumerOpen = true;
    },
    editConsumer(consumer) {
      this.selectedConsumer = consumer;
      this.ConsumerOpen = true;
    }
  }
};
</script>
