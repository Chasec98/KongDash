<template>
  <v-card class="modal">
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.name"
            label="Name (optional)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.url"
            label="URL (optional)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field v-model="service.host" label="Host"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.path"
            label="Path (optional)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Tags"
            small-chips
            multiple
            v-model="service.tags"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-select
            v-model="service.protocol"
            label="Protocol"
            :items="protocols"
          ></v-select>
        </v-col>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.port"
            label="Port"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.retries"
            type="number"
            label="Retries"
          ></v-text-field>
        </v-col>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.read_timeout"
            label="Read Timeout"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.connect_timeout"
            type="number"
            label="Connect Timeout"
          ></v-text-field>
        </v-col>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.write_timeout"
            label="Write Timeout"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="service.client_certificate"
            label="Client Certificate (optional)"
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
import constants from "../../constants";
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      default: () => ({
        id: undefined,
        name: undefined,
        host: undefined,
        path: undefined,
        port: 80,
        protocol: "http",
        connect_timeout: 60000,
        write_timeout: 60000,
        retries: 5,
        url: undefined,
        read_timeout: 60000,
        client_certificate: undefined,
        tags: []
      })
    }
  },
  data: () => ({
    protocols: constants.protocols
  }),
  methods: {
    ...mapActions("services", ["updateService", "createService"]),
    cancelClicked() {
      this.$emit("cancel");
    },
    submitClicked() {
      if (this.service.id) {
        this.updateService(this.service);
      } else {
        this.createService(this.service);
      }
      this.$emit("cancel");
    }
  },
  computed: {
    title() {
      if (this.service.id) {
        return "Edit Service";
      } else {
        return "New Service";
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
