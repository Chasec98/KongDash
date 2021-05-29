<template>
  <v-container>
    <v-data-table hide-default-footer :headers="headers" :items="pluginList">
      <template v-slot:[`item.buttons`]="{ item }">
        <v-btn @click="setPlugin(item)" text color="secondary">
          Select
        </v-btn>
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <v-img max-width="40px" :src="item.image"></v-img>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { consumerModuleTypes } from "../../store/mutation-types";

export default {
  props: {
    consumerView: {
      default: false,
      type: Boolean
    },
    plugins: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: () => ({
    headers: [
      { text: "", value: "image" },
      { text: "Name", value: "displayName" },
      { text: "", value: "buttons" }
    ]
  }),
  computed: {
    pluginList() {
      let list = this.plugins;

      if (this.consumerView) {
        list = list.filter(e => {
          return "consumer_parameters" in e;
        });
      }

      return list;
    }
  },
  methods: {
    ...mapMutations("consumers", {
      setPlugin: consumerModuleTypes.SET_SELECTED_CONSUMER_PLUGIN
    })
  }
};
</script>
