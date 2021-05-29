<template>
  <div>
    <Table
      title="Certificates"
      :data="certificates"
      :headers="headers"
      @edit="editCertificate"
      @add="addCertificate"
      @delete="deleteCertificate"
    ></Table>
    <v-dialog width="500" v-model="certificateModalOpen">
      <CertificateCard
        :certificate="selectedCertificate"
        @cancel="closeCertificate"
      />
    </v-dialog>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
import CertificateCard from "../components/certificates/CertificateCard";
export default {
  components: {
    Table,
    CertificateCard
  },
  methods: {
    ...mapActions("certificates", ["deleteCertificate"]),
    editCertificate(certificate) {
      this.selectedCertificate = certificate;
      this.certificateModalOpen = true;
    },
    closeCertificate() {
      this.certificateModalOpen = false;
      this.selectedCertificate = undefined;
    },
    addCertificate() {
      this.selectedCertificate = undefined;
      this.certificateModalOpen = true;
    }
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "SNIs", value: "snis" }
    ],
    certificateModalOpen: false,
    selectedCertificate: undefined
  }),
  created() {
    this.$store.dispatch("certificates/getCertificates");
  },
  computed: mapState({
    certificates: state => state.certificates.data
  })
};
</script>
