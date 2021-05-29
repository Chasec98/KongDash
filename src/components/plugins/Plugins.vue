<template>
    <div>
    <v-card v-show="!selectedPlugin" class="modal">
        <v-card-title>Select Plugin</v-card-title>
            <PluginsList :plugins="plugins" @getPlugin="getPlugin"></PluginsList>
        <v-card-actions>
        <v-btn text @click="close">
          Cancel
        </v-btn>
        </v-card-actions>
        </v-card>
        <Plugin v-if="selectedPlugin" :plugin="selectedPlugin" @closePlugin="closePlugin" @submit="submit"></Plugin>
    </div>
</template>

<script>
import PluginsList from './PluginsList';
import Plugin from './Plugin';

const plugins = require('../../configs/plugins.json');

import { mapActions } from 'vuex';
const dot = require('dot-object');

export default {
    name: 'Plugins',
    components: {
        PluginsList,
        Plugin,
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
        submit(plugin) {
            const apiPlugin = this.convertToAPIPlugin(plugin);
            this.createPlugin(apiPlugin);
            this.selectedPlugin = undefined;
            this.close();
        },
        closePlugin() {
            this.selectedPlugin = undefined;
        },
        getPlugin(plugin) {
            this.selectedPlugin = plugin
        },
        convertPlugin(plugin) {
            for (let [key, value] of Object.entries(plugin)) {
                console.log(`${key}: ${value}`);
            }
        },
        convertToAPIPlugin(plugin) {
            if (plugin) {
                let r = {}
                plugin.parameters.forEach(p => {
                    if (p.type === "Number") {
                        p.value = Number(p.value)
                    }
                    dot.str(p.name, p.value, plugin)
                })
                return r
            } else {
                return {}
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
