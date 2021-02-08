<template>
    <v-card class="modal">
    <v-card-title>{{title}}</v-card-title>
    <v-container>
        <v-row v-for="field in fields" :key="field.label">
            <v-col class="pt-0 pb-0">
                <v-text-field v-if="field.type === 'text-field'" :label="field.label" v-model="field.value" :type="field.number ? 'number':'text'"></v-text-field>
                <v-combobox v-if="field.type === 'combobox'" :label="field.label" v-model="field.value" multiple small-chips></v-combobox>
                <v-select v-if="field.type === 'select'" :label="field.label" v-model="field.value" :items="field.items" :multiple="field.multiple"></v-select>
                <v-switch v-if="field.type === 'switch'" :label="field.label" v-model="field.value"></v-switch>
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
export default {
    props: {
        title: String,
        fields: Array,
    },
    methods: {
        cancelClicked() {
            this.$emit("cancel");
        },
        submitClicked() {
            this.$emit("submit");
        }
    }
}
</script>
<style scoped>
.modal {
  width: 500px;
}
</style>