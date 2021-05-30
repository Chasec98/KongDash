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
        v-if="!plugin"
        :consumer="selectedConsumer"
        @cancel="closeConsumer"
      />
      <ConsumerPlugin
        v-if="plugin"
        @closePlugin="closePlugin"
      ></ConsumerPlugin>
    </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import ConsumerPlugin from "../components/consumers/ConsumerPlugin";
import ConsumerCard from "../components/consumers/ConsumerCard";

import { mapState, mapActions, mapMutations } from "vuex";
import { consumerModuleTypes } from "../store/mutation-types";

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
    consumers: state => state.apiConsumers.data,
    plugin: state => state.consumers.selectedPlugin,
  }),
  methods: {
    ...mapActions("apiConsumers", ["deleteConsumer"]),
    ...mapMutations("consumers", {
      setPlugin: consumerModuleTypes.SET_SELECTED_CONSUMER_PLUGIN
    }),
    closePlugin() {
      this.setPlugin(null);
    },
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
