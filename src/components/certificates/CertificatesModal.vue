<template>
  <v-card class="modal">
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-textarea
            v-model="certificate.cert"
            label="Certificate"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-textarea
            v-model="certificate.key"
            label="Key"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn text @click="cancelClicked">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="submitClicked">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        certificate: {
            type: Object,
            default: () => ({
                id: undefined,
                cert: undefined,
                key: undefined,
                cert_alt: undefined,
                key_alt: undefined,
                tags: []
            })
        }
    },
    methods: {
        ...mapActions("certificates", ["updateCertificate", "createCertificate"]),
        submitClicked() {
            if (this.certificate.id) {
                this.updateCertificate(this.certificate);
            } else {
                console.log("creating cert")
                this.createCertificate(this.certificate);
            }
            this.$emit("cancel");
        },
        cancelClicked() {
          this.$emit("cancel");
        }
    },
    computed: {
        title() {
        if (this.certificate.id) {
            return "Edit Certificate";
        } else {
            return "New Certificate";
        }
        }
  }
}
</script>

<style scoped>
.modal {
  width: 500px;
}
</style>
