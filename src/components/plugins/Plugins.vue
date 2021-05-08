<template>
    <div>
    <v-card v-show="!selectedPlugin" class="modal" id="selectPlugin">
        <v-card-title>Select Plugin</v-card-title>
        <v-container>
            <v-data-table hide-default-footer :headers="selectHeaders" :items="pluginList">
                <template v-slot:[`item.buttons`]="{ item }">
                    <v-btn @click="getPlugin(item.name)" text color="secondary">
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
        <v-card v-if="selectedPlugin">
            <v-card-title>{{ selectedPlugin.displayName }}</v-card-title>
            <v-container>
                <p>* = optional</p>
                <v-row v-for="param in selectedPlugin.parameters" v-bind:key="param.name">
                    <v-col v-if="param.editable === true">
                        <v-text-field :label="param.displayName" :v-model="param.default || param.value" v-if="param.type === `String`" v-model="param.value"></v-text-field>
                        <v-text-field :label="param.displayName" v-if="param.type === `Number`" type="number" v-model="param.value"></v-text-field>
                        <v-switch :label="param.displayName" v-if="param.type === 'Boolean'" v-model="param.value"></v-switch>
                        <v-select label="Route" v-if="param.type === 'Routes'" v-model="param.value" :items="routes" :item-text="resourceName" return-object></v-select>
                        <v-select label="Service" v-if="param.type === 'Services'" v-model="param.value" :items="services" :item-text="resourceName" return-object></v-select>
                        <v-select :label="param.displayName" :items="param.items" v-model="param.value" v-if="param.type ==='Array'" :multiple="param.multiple || false"></v-select>
                        <v-combobox :label="param.displayName" :items="param.items" v-model="param.value" v-if="param.type === 'Combobox'" small-chips multiple></v-combobox>
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
        selectedPlugin: undefined,
        pluginModel: undefined,
    }),
    methods: {
        ...mapActions("plugins", ["updatePlugin", "createPlugin"]),
        close() {
            this.$emit("close");
        },
        submit() {
            this.createPlugin(this.apiPlugin);
            this.selectedPlugin = undefined;
            this.close();
        },
        closePlugin() {
            this.selectedPlugin = undefined;
        },
        resourceName(r) {
            return `${r.name} - ${r.id}`
        },
        getPlugin(name) {
            this.selectedPlugin = this.plugins.filter(e => e.name === name)[0]
        },
        convertPlugin(plugin) {
            for (let [key, value] of Object.entries(plugin)) {
                console.log(`${key}: ${value}`);
            }
        }
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
        apiPlugin(){
            if (this.selectedPlugin) {
                let plugin = {}
                this.selectedPlugin.parameters.forEach(p => {
                    if (p.type === "Number") {
                        p.value = Number(p.value)
                    }
                    if (p.name.includes(".")) {
                        let s = p.name.split(".")
                        if (!plugin[s[0]]){
                            plugin[s[0]] = {};   
                        }
                        plugin[s[0]][s[1]] = p.value;
                    } else {
                        plugin[p.name] = p.value
                    }
                })
                return plugin
            } else {
                return {}
            }
        },
        ...mapState({
            routes: state => state.routes.data,
            services: state => state.services.data
        }),
    },
}
</script>
<style scoped>
.modal {
  width: 500px;
}
</style>