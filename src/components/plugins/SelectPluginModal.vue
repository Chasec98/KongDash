<template>
    <div>
    <v-card class="modal">
        <v-card-title>Select Plugin</v-card-title>
        <v-data-table hide-default-footer :headers="headers" :items="plugins">
            <template v-slot:[`item.buttons`]="{ item }">
        <v-btn @click="selectPlugin(item)" text color="secondary">
          Select
        </v-btn>
      </template>
        </v-data-table>
        <v-card-actions>
      <v-btn text @click="cancelClicked">
        Close
      </v-btn>
    </v-card-actions>
    </v-card>
    </div>
</template>
<script>

export default {
    data: () => ({
        headers: [
            { text: '', value: 'image' },
            { text: 'Name', value: 'name' },
            { text: '', value: 'buttons' }
        ],
        plugins: [
            {
                name: "Session",
                value: "session",
                description: "",
                image: ""
            },
            {
                name: "Basic Authentication",
                value: "basic-auth",
                description: "",
                image: ""
            },
            {
                name: "Key Authentication",
                value: "key-auth",
                description: "",
                image: ""
            },
            {
                name: "Key Authentication Encrypted",
                value: "key-auth-enc",
                description: "",
                image: ""
            }
        ],
    }),
    methods: {
        cancelClicked() {
            this.$emit("cancel");
        },
        selectPlugin(plugin) {
            this.$emit('selectPlugin', plugin)
        }
    }
}
</script>
<style scoped>
.modal {
  width: 500px;
}
.plugin-card {
    width: 220px;
}
</style>