<template>
  <v-card v-if="plugin">
    <v-card-title>{{ plugin.displayName }}</v-card-title>
    <v-container>
      <p>* = optional</p>
      <v-row v-for="param in plugin.parameters" v-bind:key="param.name">
        <v-col v-if="param.editable === true">
          <v-text-field
            :label="param.displayName"
            :v-model="param.default || param.value"
            v-if="param.type === `String`"
            v-model="param.value"
          ></v-text-field>
          <v-text-field
            :label="param.displayName"
            v-if="param.type === `Number`"
            type="number"
            v-model="param.value"
          ></v-text-field>
          <v-switch
            :label="param.displayName"
            v-if="param.type === 'Boolean'"
            v-model="param.value"
          ></v-switch>
          <v-select
            label="Route"
            v-if="param.type === 'Routes'"
            v-model="param.value"
            :items="routes"
            :item-text="resourceName"
            return-object
          ></v-select>
          <v-select
            label="Service"
            v-if="param.type === 'Services'"
            v-model="param.value"
            :items="services"
            :item-text="resourceName"
            return-object
          ></v-select>
          <v-select
            :label="param.displayName"
            :items="param.items"
            v-model="param.value"
            v-if="param.type === 'Array'"
            :multiple="param.multiple || false"
          ></v-select>
          <v-combobox
            :label="param.displayName"
            :items="param.items"
            v-model="param.value"
            v-if="param.type === 'Combobox'"
            small-chips
            multiple
          ></v-combobox>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn text @click="close">
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="submit">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Plugin",
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit", this.plugin);
    },
    resourceName(r) {
      return `${r.name} - ${r.id}`;
    }
  },
  computed: {
    ...mapState({
      routes: state => state.routes.data,
      services: state => state.services.data,
      plugin: state => state.consumers.selectedPlugin
    })
  }
};
</script>

<style></style>
