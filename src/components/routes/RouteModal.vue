<template>
  <!-- SNIs -->
  <v-card class="modal">
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            v-model="route.name"
            label="Name (optional)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Service"
            v-model="route.service"
            :items="services"
            :item-text="formatServiceText"
            item-value="id"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Hosts"
            small-chips
            multiple
            v-model="route.hosts"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Paths"
            small-chips
            multiple
            v-model="route.paths"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Methods"
            multiple
            small-chips
            :items="methods"
            v-model="route.methods"
          ></v-combobox>
        </v-col>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Protocols"
            multiple
            small-chips
            :items="protocols"
            v-model="route.protocols"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-switch v-model="route.strip_path" label="Strip Path"></v-switch>
        </v-col>
        <v-col class="pt-0 pb-0">
          <v-switch
            v-model="route.preserve_host"
            label="Preserve Host"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-text-field
            type="number"
            label="Regex Priority"
            v-model="route.regex_priority"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-switch
            v-model="route.response_buffering"
            label="Response Buffering"
          ></v-switch>
        </v-col>
        <v-col class="pt-0 pb-0">
          <v-switch
            v-model="route.request_buffering"
            label="Request Buffering"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Path Handling"
            small-chips
            :items="pathHandlers"
            v-model="route.path_handling"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-combobox
            label="Tags"
            small-chips
            multiple
            v-model="route.tags"
          ></v-combobox>
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
import { mapState, mapActions } from "vuex";
import constants from "../../constants";
export default {
  props: {
    route: {
      type: Object,
      default: () => ({
        id: undefined,
        name: undefined,
        protocols: undefined,
        methods: undefined,
        tags: [],
        hosts: undefined,
        paths: undefined,
        strip_path: true,
        preserve_host: false,
        path_handling: "v0",
        regex_priority: 0,
        response_buffering: true,
        request_buffering: true
      })
    }
  },
  data: () => ({
    methods: constants.methods,
    protocols: constants.protocols,
    pathHandlers: constants.pathHandlers
  }),
  methods: {
    ...mapActions("routes", ["updateRoute", "createRoute"]),
    cancelClicked() {
      this.$emit("cancel");
    },
    submitClicked() {
      if (this.route.id) {
        this.updateRoute(this.route);
      } else {
        this.createRoute(this.route);
      }
      this.$emit("cancel");
    },
    formatServiceText(service) {
      const name = this.services.find(x => x.id === service.id).name;
      return name + " - " + service.id;
    }
  },
  computed: {
    ...mapState({
      services: state => state.services.data
    }),
    title() {
      if (this.route.id) {
        return "Edit Route";
      } else {
        return "New Route";
      }
    }
  },
  mounted() {
    this.$store.dispatch("services/getServices");
  }
};
</script>
<style scoped>
.modal {
  width: 500px;
}
</style>
