<template>
<v-card>
    <v-card-title>Routes</v-card-title>
    <v-card-subtitle></v-card-subtitle>
    <v-data-table
    dense
    :headers="headers"
    :items="routes"
    item-key="id"
    class="elevation-1"
  ></v-data-table>
</v-card>
</template>
<script>
export default {
    data: () => ({
        headers: [
        { text: 'Name', value: 'name' },
        { text: 'Protocols', value: 'protocols' },
        { text: 'Methods', value: 'methods' },
        { text: 'Hosts', value: 'hosts' },
        { text: 'Paths', value: 'paths' }
        ]
    })
}
</script>