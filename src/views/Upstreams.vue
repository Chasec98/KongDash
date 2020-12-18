<template>
  <Table title="Upsteams" :headers="headers" :data="upstreams" @delete="deleteService" />
</template>
<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Algorithm", value: "algorithm" },
      { text: "ID", value: "id" }
    ]
  }),
  components: {
    Table
  },
  created() {
    this.$store.dispatch("upstreams/getUpstreams");
  },
  computed: mapState({
    upstreams: state => state.upstreams.data
  }),
  methods: mapActions('upstreams', [
    'deleteUpstream'
  ]),
};
</script>
