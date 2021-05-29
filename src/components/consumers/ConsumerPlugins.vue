<template>
    <PluginList :consumerView="true" :plugins="pluginsList" @getPlugin="getPlugin"></PluginList>
</template>

<script>
import PluginList from '../plugins/PluginsList';

export default {
    name: 'ConsumerPlugins',
    components: {
        PluginList,
    },
    data: () => ({
        pluginsList: require('../../configs/plugins.json'),
    }),
    methods: {
        getPlugin(plugin) {
            this.$emit('getPlugin', plugin)
        },
    }
}
</script>