<template>
  <v-card class="modal">
    <v-card-title>{{ title }}</v-card-title>
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
import { mapActions } from "vuex";
export default {
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
  data: () => ({}),
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
