<template>
  <PluginList
    :consumerView="true"
    :plugins="pluginsList"
  ></PluginList>
</template>

<script>
import PluginList from "../plugins/PluginsList";

export default {
  name: "ConsumerPlugins",
  components: {
    PluginList
  },
  data: () => ({
    pluginsList: require("../../configs/plugins.json")
  }),
};
</script>
