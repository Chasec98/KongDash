<template>
  <v-card>
        <v-card-title>{{ plugin.displayName }}</v-card-title>
        <p>* = optional</p>
        <v-row v-for="param in plugin.consumer_parameters" v-bind:key="param.name">
            <v-text-field :label="param.displayName" :v-model="param.default || param.value" v-if="param.type === `String`" v-model="param.value"></v-text-field>
        </v-row>
        <v-card-actions>
            <v-btn text @click="closePlugin">
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
export default {
    name: 'ConsumerPlugin',
    props: {
        plugin: {
            type: Object,
            default: () => ({}),
        }
    },
    methods: {
        closePlugin() {
            this.$emit('closePlugin')
        },
        submit() {
            this.$emit('submit', this.plugin)
        },
    }
}
</script>