<template>
<v-card>
    <v-card-title>Services</v-card-title>
    <v-card-subtitle>The service module contains a set of functions to manipulate the connection aspect of the request to the Service, such as connecting to a given host, IP address/port, or choosing a given Upstream entity for load-balancing and healthchecking.</v-card-subtitle>
    <v-data-table
    dense
    :headers="headers"
    :items="services"
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
        { text: 'Protocol', value: 'protocol' },
        { text: 'Host', value: 'host' },
        { text: 'Path', value: 'path' },
        { text: 'ID', value: 'id' },
        { text: '', value: '' }
        ]
    })
}
</script>