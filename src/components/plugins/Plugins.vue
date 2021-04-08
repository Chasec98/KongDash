<template>
    <div>
    <v-card v-show="!showPlugin" class="modal" id="selectPlugin">
        <v-card-title>Select Plugin</v-card-title>
        <v-container>
            <v-data-table hide-default-footer :headers="selectHeaders" :items="plugins">
                <template v-slot:[`item.buttons`]="{ item }">
                    <v-btn @click="selectPlugin(item)" text color="secondary">
                        Select
                    </v-btn>
                </template>
                <template v-slot:[`item.image`]="{ item }">
                    <v-img max-width="40px" :src="item.image"></v-img>
                </template>
            </v-data-table>
        </v-container>
        <v-card-actions>
        <v-btn text @click="close">
            Cancel
        </v-btn>
        </v-card-actions>
        </v-card>
        <v-card v-show="showPlugin">
            <v-card-title>{{ pluginName }}</v-card-title>
            <v-container>
                <p>* = optional</p>
                <v-row v-for="param in pluginParams" v-bind:key="param.name">
                    <v-col v-if="param.editable === true">
                        <v-text-field :label="param.displayName" :v-model="param.default || param.value" v-if="param.type === `String`" v-model="pluginModel[param.name]"></v-text-field>
                        <v-text-field :label="param.displayName" :v-model="param.default" v-if="param.type === `Number`" type="number" v-model="pluginModel[param.name]"></v-text-field>
                        <v-switch :label="param.displayName" v-if="param.type === 'Boolean'" v-model="pluginModel[param.name]"></v-switch>
                        <v-select label="Route" v-if="param.type === 'Routes'" v-model="pluginModel[param.name]" :items="routes" :item-text="resourceName" return-object></v-select>
                        <v-select label="Service" v-if="param.type === 'Services'" v-model="pluginModel[param.name]" :items="services" :item-text="resourceName" return-object></v-select>
                        <v-select :label="param.displayName" :items="param.items" v-model="pluginModel[param.name]" v-if="param.type ==='Array'" :multiple="param.multiple || false"></v-select>
                        <v-combobox :label="param.displayName" :items="param.items" v-model="pluginModel[param.name]" v-if="param.type === 'Combobox'" small-chips multiple></v-combobox>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-btn text @click="closePlugin">
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="submit">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
const plugins = require('../../configs/plugins.json');
import { mapState, mapActions } from 'vuex';
export default {
    mounted() {
        this.$store.dispatch("services/getServices");
        this.$store.dispatch("routes/getRoutes");
    },
    data: () => ({
        selectHeaders: [
            { text: '', value: 'image' },
            { text: 'Name', value: 'displayName' },
            { text: '', value: 'buttons' }
        ],
        showPlugin: false,
        selectedPlugin: undefined,
        pluginModel: {}
    }),
    methods: {
        ...mapActions("plugins", ["updatePlugin", "createPlugin"]),
        close() {
            this.$emit("close");
        },
        submit() {
            for (const [key, value] of Object.entries(this.pluginModel)) {
                if (key.includes(".")){
                    const strs = key.split(".");
                    if (!this.pluginModel[strs[0]]){
                        this.pluginModel[strs[0]] = {};
                    }
                    if (strs[1] !== null) {
                        this.pluginModel[strs[0]][strs[1]] = value;
                        delete this.pluginModel[key];   
                    }
                }
                if (value === null) {
                    delete this.pluginModel[key];
                }
            }
            this.createPlugin(this.pluginModel);
            this.showPlugin = false;
            this.close();
        },
        closePlugin() {
            this.showPlugin = false;
        },
        selectPlugin(plugin) {
            this.showPlugin = true
            this.selectedPlugin = plugin;
            this.pluginModel = {};
            plugin.parameters.forEach(e => {
                this.pluginModel[e.name] = e.default
            })
        },
        resourceName(r) {
            return `${r.name} - ${r.id}`
        }
    },
    computed: {
        plugins() {
            return plugins
        },
        pluginName() {
            if (this.selectedPlugin) {
                return this.selectedPlugin.displayName
            } else {
                return ""
            }
        },
        pluginParams() {
            if (this.selectedPlugin) {
                return this.selectedPlugin.parameters
            } else {
                return []
            }
        },
        ...mapState({
            routes: state => state.routes.data,
            services: state => state.services.data
        }),
    }
}
</script>
<style scoped>
.modal {
  width: 500px;
}
</style>