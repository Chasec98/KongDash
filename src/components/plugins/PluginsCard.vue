<template>
    <v-card v-show="!selectedPlugin" class="modal">
        <v-card-title>Select Plugin</v-card-title>
            <PluginsList :plugins="plugins" @getPlugin="getPlugin"></PluginsList>
        <v-card-actions>
        <v-btn text @click="close">
          Cancel
        </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { PluginsList } from '.';

const plugins = require('../../configs/plugins.json');

import { mapActions } from 'vuex';

export default {
    name: 'PluginsCard',
    components: {
        PluginsList,
    },
    data: () => ({
        selectHeaders: [
            { text: "", value: "image" },
            { text: "Name", value: "displayName" },
            { text: "", value: "buttons" }
        ],
        showPlugin: false,
        selectedPlugin: undefined,
        pluginModel: {}
    }),
    mounted() {
        this.$store.dispatch("services/getServices");
        this.$store.dispatch("routes/getRoutes");
    },
    methods: {
        ...mapActions("plugins", ["updatePlugin", "createPlugin"]),
        close() {
            this.$emit("close");
        },
        getPlugin(plugin) {
            this.selectedPlugin = plugin
        },
        convertPlugin(plugin) {
            for (let [key, value] of Object.entries(plugin)) {
                console.log(`${key}: ${value}`);
            }
        },
      },
    computed: {
        plugins() {
            return plugins
        },
        pluginList(){
            return this.plugins.map(plugin => {
                return {
                    displayName: plugin.displayName,
                    name: plugin.name,
                    image: plugin.image,
                }
            })
        },
    },
}
</script>
<style scoped>
.modal {
  width: 500px;
}
</style>
