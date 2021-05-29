<template>
  <div>
    <Table
      title="Upsteams"
      :headers="headers"
      :data="upstreams"
      @edit="editUpstream"
      @add="addUpstream"
      @delete="deleteUpstream"
    />
    <v-dialog width="500" v-model="UpstreamCardOpen">
      <UpstreamCard :upstream="selectedUpstream" @cancel="closeUpstream" />
    </v-dialog>
  </div>
</template>
<script>
import Table from "../components/Table";
import UpstreamCard from "../components/upstreams/UpstreamCard";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Algorithm", value: "algorithm" },
      { text: "ID", value: "id" }
    ],
    selectedUpstream: undefined,
    UpstreamCardOpen: undefined
  }),
  components: {
    Table,
    UpstreamCard
  },
  created() {
    this.$store.dispatch("upstreams/getUpstreams");
  },
  computed: mapState({
    upstreams: state => state.upstreams.data
  }),
  methods: {
    ...mapActions("upstreams", ["deleteUpstream"]),
    closeUpstream() {
      this.UpstreamCardOpen = false;
      this.selectedUpstream = undefined;
    },
    editUpstream(upstream) {
      this.selectedUpstream = upstream;
      this.UpstreamCardOpen = true;
    },
    addUpstream() {
      this.selectedUpstream = undefined;
      this.UpstreamCardOpen = true;
    }
  }
};
</script>
