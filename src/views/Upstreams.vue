<template>
<div>
  <Table title="Upsteams" :headers="headers" :data="upstreams" @edit="editUpstream" @add="addUpstream" @delete="deleteUpstream" />
  <v-dialog width="500" v-model="upstreamModalOpen">
      <UpstreamModal :upstream="selectedUpstream" @cancel="closeUpstream" />
  </v-dialog>
</div>
</template>
<script>
import Table from "../components/Table";
import UpstreamModal from "../components/upstreams/UpstreamModal";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Algorithm", value: "algorithm" },
      { text: "ID", value: "id" }
    ],
    selectedUpstream: undefined,
    upstreamModalOpen: undefined,
  }),
  components: {
    Table,
    UpstreamModal,
  },
  created() {
    this.$store.dispatch("upstreams/getUpstreams");
  },
  computed: mapState({
    upstreams: state => state.upstreams.data
  }),
  methods: {
    ...mapActions('upstreams', [
      'deleteUpstream'
    ]),
    closeUpstream() {
      this.upstreamModalOpen = false;
      this.selectedUpstream = undefined;

    },
    editUpstream(upstream) {
      this.selectedUpstream = upstream;
      this.upstreamModalOpen = true;
    },
    addUpstream() {
      this.selectedUpstream = undefined;
      this.upstreamModalOpen = true;
    },
  }
};
</script>
