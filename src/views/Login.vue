<template>
    <v-card>
        <v-card-title>Login</v-card-title>
        <v-form>
            <v-text-field required label="Username"></v-text-field>
            <v-text-field required label="Password"></v-text-field>
            <v-btn @click="login">Login</v-btn>
        </v-form>
    </v-card>    
</template>
<script>
export default {
    methods: {
        login() {

        }
    }
}
</script>
<style scoped>

</style>