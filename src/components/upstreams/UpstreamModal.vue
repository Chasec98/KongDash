<template>
    <v-card>
        <v-card-title>{{title}}</v-card-title>
        <v-container>
            <v-row>
                <v-col class="pt-0 pb-0">
                    <v-text-field label="Name" v-model="upstream.name"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="pt-0 pb-0">
                    <v-combobox label="Algorithm" :items="algorithms" v-model="upstream.algorithm"></v-combobox>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="pt-0 pb-0">
                    <v-combobox label="Hash On" :items="hashOptions" v-model="upstream.hash_on"></v-combobox>
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text @click="cancelClicked">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="submitClicked"
          >
            Submit
          </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
    props: {
        upstream: {
            default: () => ({
                id: undefined,
                name: undefined,
                algorithm: "round-robin",
                hash_on: "none",
                hash_fallback: "none",
                hash_on_cookie_path: undefined,
                slots: 10000,
                hash_on_header: undefined,
                hash_on_cookie: undefined,
                tags: [],
                host_header: undefined,
                client_certificate: undefined,
            })
        }
    },
    data: () => ({
        algorithms: [
            "round-robin",
            "consistent-hashing",
            "least-connections",
        ],
        hashOptions: [
            "none",
            "consumer",
            "ip",
            "header",
            "cookie",
        ]
    }),
    methods: {
        ...mapActions('upstreams', [
            'updateUpstream',
            'createUpstream'
        ]),
        cancelClicked() {
            this.$emit('cancel')
        },
        submitClicked() {
            if (this.upstream.id){
                this.updateUpstream(this.upstream)
            } else {
                this.createUpstream(this.upstream)
            }
            this.$emit('cancel');
        }
    },
    computed: {
        title() {
            if (this.upstream.id) {
                return "Edit Upstream"
            } else {
                return "New Upstream"
            }
        }
    },
}
</script>
<style scoped>
    .modal {
        width: 500px;
    }
</style>