<template>
  <v-card>
    <v-card-title
      >{{ title }}
      <v-spacer></v-spacer>
      <v-btn @click="addClicked" color="primary">New</v-btn>
    </v-card-title>
    <v-card-subtitle></v-card-subtitle>
    <v-data-table
      dense
      :headers="allHeaders"
      :items="data"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.buttons`]="{ item }">
        <v-btn @click="editClicked(item)" icon color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="deleteClicked(item.id)" icon color="primary">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        {{ item.id }}
        <v-btn icon color="primary">
          <v-icon>mdi-clipboard-text</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: {
    data: Array,
    headers: Array,
    title: String,
    subTitle: String
  },
  data: () => ({
    extraHeaders: [{ text: "", value: "buttons" }]
  }),
  methods: {
    editClicked(item) {
      this.$emit("edit", item);
    },
    deleteClicked(id) {
      this.$emit("delete", id);
    },
    addClicked() {
      this.$emit("add");
    }
  },
  computed: {
    allHeaders() {
      return this.headers.concat(this.extraHeaders);
    }
  }
};
</script>
