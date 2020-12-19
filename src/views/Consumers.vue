<template>
  <div>
    <Table title="Consumers" :data="consumers" :headers="headers" @edit="editConsumer" @add="addConsumer" @delete="deleteConsumer"/>
    <v-dialog width="500" v-model="consumerModalOpen">
      <ConsumerModal :consumer="selectedConsumer" @cancel="closeConsumerModal" />
  </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import ConsumerModal from "../components/consumers/ConsumerModal";
import { mapState, mapActions } from "vuex";
export default {
    data: () => ({
        headers: [
          { text: "Username", value: "username" },
          { text: "Custom ID", value: "custom_id" },
          { text: "ID", value: "id" }
        ],
        selectedConsumer: undefined,
        consumerModalOpen: false
    }),
  components: {
    Table,
    ConsumerModal
  },
  created() {
    this.$store.dispatch("consumers/getConsumers");
  },
  computed: mapState({
    consumers: state => state.consumers.data,
  }),
  methods: {
    ...mapActions('consumers', [
      'deleteConsumer'
    ]),
    closeConsumerModal() {
      this.consumerModalOpen = false
      this.selectedConsumer = undefined
    },
    addConsumer() {
      this.selectedConsumer = undefined
      this.consumerModalOpen = true
    },
    editConsumer(consumer) {
      this.selectedConsumer = consumer
      this.consumerModalOpen = true
    }
  } 
};
</script>
