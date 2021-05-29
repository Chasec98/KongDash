<template>
  <v-card class="modal">
    <v-card-title>{{ title }}</v-card-title>
    <v-tabs v-model="tab" centered>
      <v-tab key="tab-1">Consumer</v-tab>
      <v-tab key="tab-2">Plugins</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="tab-1">
        <v-container>
          <v-row>
            <v-col class="pt-0 pb-0">
              <v-text-field
                v-model="consumer.username"
                label="Username"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pt-0 pb-0">
              <v-text-field
                v-model="consumer.custom_id"
                label="Custom ID"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item key="tab-2">
        <ConsumerPlugins/>
      </v-tab-item>
    </v-tabs-items>
    <v-card-actions>
      <v-btn text @click="cancelClicked">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="submitClicked">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import ConsumerPlugins from './ConsumerPlugins'
import { mapActions } from "vuex";
export default {
  components: {
    ConsumerPlugins
  },
  props: {
    consumer: {
      type: Object,
      default: () => ({
        id: undefined,
        username: undefined,
        custom_id: undefined,
        tags: []
      })
    }
  },
  data: () => ({
    tab: 'tab-1'
  }),
  methods: {
    ...mapActions("consumers", ["updateConsumer", "createConsumer"]),
    cancelClicked() {
      this.$emit("cancel");
    },
    submitClicked() {
      if (this.consumer.id) {
        this.updateConsumer(this.consumer);
      } else {
        this.createConsumer(this.consumer);
      }
      this.$emit("cancel");
    }
  },
  computed: {
    title() {
      if (this.consumer.id) {
        return "Edit Consumer";
      } else {
        return "New Consumer";
      }
    }
  }
};
</script>
<style scoped>
.modal {
  width: 500px;
}
</style>
